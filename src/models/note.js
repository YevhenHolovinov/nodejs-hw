import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, //прибирає пробіли на початку і в кінці
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tag: {
      type: String,
      required: true,
      enum: [
        'shopping',
        'meeting',
        'travel',
        'health',
        'work',
        'finance',
        'personal',
        'ideas',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', noteSchema);

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//type - тип даних (String, Number, Boolean).
//required - чи поле обов'язкове.
//trim: true - автоматично видаляє зайві пробіли на початку та в кінці рядка. Корисно для текстових полів, таких як name, щоб уникнути збереження значень на кшталт " John ".
//enum — перелік допустимих значень (наприклад, для gender).
//default — значення за замовчуванням, якщо поле не передано.
//timestamps — автоматично додає createdAt і updatedAt.
//versionKey: false — вимикає службове поле __v.
