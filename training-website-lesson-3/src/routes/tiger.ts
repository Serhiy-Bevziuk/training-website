import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { TigerRepository } from '../repositories/TigerRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію тигрів з контейнера інверсії залежностей
const tigerRepository = container.get(TigerRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів тигрів
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи тигрів з бази даних через репозиторій
        const tigers = await tigerRepository.findAll();
        res.json(tigers);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одного тигра за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук тигра за ідентифікатором
        const tiger = await tigerRepository.findById(req.params.id);
        if (tiger) {
            res.json(tiger);
        } else {
            // Якщо тигр не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис тигра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису тигра
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис тигра з даних запиту
        const newTiger = await tigerRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного тигра
        res.status(201).json(newTiger);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису тигра
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо тигра з вказаним ID
        const tiger = await tigerRepository.update(req.params.id, req.body);
        if (tiger) {
            return res.json(tiger);
        } else {
            // Якщо тигр не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис тигра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису тигра
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису тигра - передаються лише ті поля, які потрібно змінити
        const tiger = await tigerRepository.patch(req.params.id, req.body);
        if (tiger) {
            res.json(tiger);
        } else {
            // Якщо тигр не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис тигра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису тигра
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про тигра за ID
        const deleted = await tigerRepository.delete(req.params.id);
        if (deleted) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про тигра видалено' });
        } else {
            // Якщо тигр не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про тигра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
