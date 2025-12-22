import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

//Глобальні middleware.
app.use(logger); //1. Логер першим - бачить усі запити.
app.use(express.json()); //2. Парсинг JSON-тіла.
app.use(cors()); //3. Дозвіл на запит з інших доменів.
app.use(cookieParser());

//Router авторизвції
app.use(authRoutes);
//підключаємо групу маршрутів нотатокю
app.use(notesRoutes);
//Додаєм раути користувача
app.use(userRoutes);

// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);

//обробка помилок від celebrate(валідація)
app.use(errors());

// Middleware для обробки помилок
app.use(errorHandler);

//Підключеня до MongoDB
await connectMongoDB();

//запуск сервера
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
