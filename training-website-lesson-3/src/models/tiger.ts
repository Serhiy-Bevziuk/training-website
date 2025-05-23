import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Тигр"
interface ITiger {
    name: string; // Ім'я тигра
    age: number; // Вік тигра у роках
    height: number; // Висота тигра в сантиметрах
    weight: number; // Вага тигра в кілограмах
    gender: 'male' | 'female'; // Стать тигра: 'male' - самець, 'female' - самка
    preyEatenKilo: number;
    description?: string; // Опис тигра (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Тигр"
const tigerSchema = new Schema<ITiger>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    preyEatenKilo: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const Tiger = model<ITiger>('Tiger', tigerSchema);
export type { ITiger }; // Експортуємо інтерфейс для використання в інших файлах
