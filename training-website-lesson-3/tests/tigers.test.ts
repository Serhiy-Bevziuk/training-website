import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Tiger } from '../src/models/tiger';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про тигрів
describe('API вебдодатку сайту про тигрів', () => {
    const database = container.get<IDatabase>(TYPES.IDatabase);
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/tigers-test');

    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    after(async () => {
        try {
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "tigers-test" успішно видалено');
        } catch (error) {
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    beforeEach(async () => {
        await Tiger.deleteMany({});
    });

    describe('POST /api/tigers', () => {
        it('має створити запис про нового тигра', done => {
            const tiger = {
                name: 'Tiger1',
                age: 3,
                height: 100,
                weight: 200,
                gender: 'male' as const,
                description: 'Big striped tiger',
            };

            chai.request(app)
                .post('/api/tigers')
                .send(tiger)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', tiger.name);
                    expect(res.body).to.have.property('age', tiger.age);
                    expect(res.body).to.have.property('height', tiger.height);
                    expect(res.body).to.have.property('weight', tiger.weight);
                    expect(res.body).to.have.property('gender', tiger.gender);
                    expect(res.body).to.have.property('description', tiger.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    describe('GET /api/tigers', () => {
        it('має отримати всіх тигрів', async () => {
            const testTiger = new Tiger({
                name: 'Tiger1',
                age: 3,
                height: 100,
                weight: 200,
                gender: 'male' as const,
                description: 'Big striped tiger',
            });
            await testTiger.save();

            const res = await chai.request(app).get('/api/tigers');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Tiger1');
            expect(res.body[0]).to.have.property('gender', 'male');
            expect(res.body[0]).to.have.property('description', 'Big striped tiger');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    describe('GET /api/tigers/:id', () => {
        it('має отримати конкретного тигра за id', async () => {
            const testTiger = new Tiger({
                name: 'Tiger2',
                age: 4,
                height: 110,
                weight: 210,
                gender: 'male',
                description: 'Tiger2',
            });
            const savedTiger = await testTiger.save();

            const res = await chai.request(app).get(`/api/tigers/${String(savedTiger._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Tiger2');
            expect(res.body).to.have.property('age', 4);
            expect(res.body).to.have.property('height', 110);
            expect(res.body).to.have.property('weight', 210);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Tiger2');
        });

        it('має повернути 404 для неіснуючого тигра', async () => {
            const res = await chai.request(app).get('/api/tigers/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    describe('PUT /api/tigers/:id', () => {
        it('має повністю оновити запис про тигра', async () => {
            const testTiger = new Tiger({
                name: 'Оригінальний',
                age: 4,
                height: 110,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedTiger = await testTiger.save();

            const updatedData = {
                name: 'Оновлений',
                age: 5,
                height: 120,
                weight: 220,
                gender: 'female',
                description: 'Оновлений опис',
            };

            const res = await chai
                .request(app)
                .put(`/api/tigers/${String(savedTiger._id)}`)
                .send(updatedData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 5);
            expect(res.body).to.have.property('height', 120);
            expect(res.body).to.have.property('weight', 220);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            const testTiger = new Tiger({
                name: 'Оригінальний',
                age: 4,
                height: 110,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedTiger = await testTiger.save();

            const incompleteData = {
                name: 'Оновлений',
                age: 5,
                gender: 'female',
                description: 'Оновлений опис',
                // height і weight відсутні
            };

            const res = await chai
                .request(app)
                .put(`/api/tigers/${String(savedTiger._id)}`)
                .send(incompleteData);

            expect(res).to.have.status(400);

            const unchangedTiger = await Tiger.findById(savedTiger._id);
            expect(unchangedTiger).to.have.property('name', 'Оригінальний');
            expect(unchangedTiger).to.have.property('height', 110);
            expect(unchangedTiger).to.have.property('weight', 210);
        });
    });

    describe('PATCH /api/tigers/:id', () => {
        it('має частково оновити запис про тигра', async () => {
            const testTiger = new Tiger({
                name: 'Оригінальний',
                age: 4,
                height: 110,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedTiger = await testTiger.save();

            const patchData = {
                name: 'Частково оновлений',
                age: 6,
                description: 'Оновлений опис',
            };

            const res = await chai
                .request(app)
                .patch(`/api/tigers/${String(savedTiger._id)}`)
                .send(patchData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 6);
            expect(res.body).to.have.property('height', 110);
            expect(res.body).to.have.property('weight', 210);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            const testTiger = new Tiger({
                name: 'Оригінальний',
                age: 4,
                height: 110,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedTiger = await testTiger.save();

            const patchData = {
                name: 'Частково оновлений',
                age: 7,
                description: 'Оновлений опис',
            };

            // PATCH — оновлює вибірково
            const resPatch = await chai
                .request(app)
                .patch(`/api/tigers/${String(savedTiger._id)}`)
                .send(patchData);
            expect(resPatch).to.have.status(200);
            expect(resPatch.body).to.have.property('name', 'Частково оновлений');
            expect(resPatch.body).to.have.property('age', 7);
            expect(resPatch.body).to.have.property('height', 110);
            expect(resPatch.body).to.have.property('weight', 210);

            // PUT — повністю замінює документ, якщо відсутні поля — видаляє їх (тут приклад для порівняння)
            const resPut = await chai
                .request(app)
                .put(`/api/tigers/${String(savedTiger._id)}`)
                .send(patchData);
            expect(resPut).to.have.status(400); // Очікуємо помилку через відсутність обов'язкових полів
        });
    });

    describe('DELETE /api/tigers/:id', () => {
        it('має видалити тигра за id', async () => {
            const testTiger = new Tiger({
                name: 'TigerToDelete',
                age: 5,
                height: 120,
                weight: 220,
                gender: 'female',
                description: 'Тигр для видалення',
            });
            const savedTiger = await testTiger.save();

            const res = await chai.request(app).delete(`/api/tigers/${String(savedTiger._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').that.includes('успішно видалено');

            const deletedTiger = await Tiger.findById(savedTiger._id);
            expect(deletedTiger).to.be.null;
        });
    });
});
