import { injectable } from 'inversify';
import { Tiger, ITiger } from '../models/tiger';

// Клас-репозиторій для роботи з тиграми
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class TigerRepository {
    // Метод для отримання всіх тигрів з бази даних
    public async findAll(): Promise<ITiger[]> {
        return Tiger.find();
    }

    // Метод для пошуку тигра за унікальним ідентифікатором
    public async findById(id: string): Promise<ITiger | null> {
        return Tiger.findById(id);
    }

    // Метод для створення нового тигра в базі даних
    public async create(tigerData: ITiger): Promise<ITiger> {
        const tiger = new Tiger(tigerData);
        return tiger.save();
    }

    // Метод для видалення тигра за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Tiger.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про тигра (заміна всіх полів)
    public async update(id: string, tigerData: ITiger): Promise<ITiger | null> {
        return Tiger.findByIdAndUpdate(id, tigerData, { new: true });
    }

    // Метод для часткового оновлення даних про тигра (оновлення лише вказаних полів)
    public async patch(id: string, tigerData: Partial<ITiger>): Promise<ITiger | null> {
        return Tiger.findByIdAndUpdate(id, { $set: tigerData }, { new: true });
    }
}
