// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про тигра',
        version: '1.0.0',
        description: 'Документація API для Сайту про тигра',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/tigers': {
            get: {
                summary: 'Отримати всіх тигрів',
                responses: {
                    '200': {
                        description: 'Список всіх тигрів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Tiger' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Створити нового тигра',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Tiger' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт тигра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Tiger' },
                            },
                        },
                    },
                },
            },
        },
        '/api/tigers/{id}': {
            get: {
                summary: 'Отримати тигра за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID тигра',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт тигра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Tiger' },
                            },
                        },
                    },
                    '404': { description: 'тигра не знайдено' },
                },
            },
            put: {
                summary: 'Повністю оновити тигра',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID тигра',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Tiger' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт тигра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Tiger' },
                            },
                        },
                    },
                    '404': { description: 'тигра не знайдено' },
                },
            },
            patch: {
                summary: 'Частково оновити тигра',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID тигра',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Tiger' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт тигра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Tiger' },
                            },
                        },
                    },
                    '404': { description: 'тигра не знайдено' },
                },
            },
            delete: {
                summary: 'Видалити дані про тигра',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID тигра',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'тигра не знайдено' },
                },
            },
        },
    },
    components: {
        schemas: {
            Tiger: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я тигра",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік тигра у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота тигра в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага тигра в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать тигра',
                    },
                    bambooEatenKilo: {
                        type: 'number',
                        description: 'Вага м’яса (умовно)',
                    },
                    description: {
                        type: 'string',
                        description: "Опис тигра (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
