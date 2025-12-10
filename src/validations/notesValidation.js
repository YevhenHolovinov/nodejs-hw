import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...Object.values(TAGS)),
  }),
};
// Для маршруту POST /notes потрібно валідувати тіло запиту як об’єкт із наступними властивостями:
// title - рядок, мінімум 1 символ, обов’язкове поле
// content - рядок, може бути порожнім рядком, необов’язкове поле
// tag - одне зі значень із файла src/contacts/tags.js, необов’язкове поле.
// Для цього створіть схему валідації createNoteSchema (не змінюйте назву) у файлі src/validations/notesValidation.js.

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...Object.values(TAGS)),
  }).min(1),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...Object.values(TAGS)),
    search: Joi.string().trim().allow(''),
  }),
};
