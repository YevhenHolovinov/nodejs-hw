import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

//Глобальні middleware.
app.use(logger); //1. Логер першим - бачить усі запити.
app.use(express.json()); //2. Парсинг JSON-тіла.
app.use(cors()); //3. Дозвіл на запит з інших доменів.

//підключаємо групу маршрутів нотатокю
app.use(notesRoutes);

// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);

// Middleware для обробки помилок
app.use(errorHandler);

//Підключеня до MongoDB
await connectMongoDB();

//запуск сервера
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
