import { useState, useRef, useEffect } from "react";

// ─── Расширенная база продуктов (150+ позиций, КБЖУ на 100г или указанную порцию) ──
const FOOD_DB = [
  // ── Мясо и птица ──
  { name: "Куриная грудка варёная (100г)", kcal: 165, p: 31, f: 3.6, c: 0, cat: "Мясо" },
  { name: "Куриное бедро варёное (100г)", kcal: 215, p: 22, f: 13, c: 0, cat: "Мясо" },
  { name: "Говядина варёная (100г)", kcal: 187, p: 26, f: 8, c: 0, cat: "Мясо" },
  { name: "Свинина жареная (100г)", kcal: 290, p: 25, f: 20, c: 0, cat: "Мясо" },
  { name: "Котлета говяжья (1 шт 80г)", kcal: 195, p: 15, f: 13, c: 5, cat: "Мясо" },
  { name: "Пельмени варёные (100г)", kcal: 245, p: 12, f: 9, c: 29, cat: "Мясо" },
  { name: "Сосиска молочная (1 шт 50г)", kcal: 140, p: 6, f: 12, c: 2, cat: "Мясо" },
  { name: "Колбаса докторская (100г)", kcal: 257, p: 13, f: 22, c: 1.5, cat: "Мясо" },
  { name: "Бекон жареный (100г)", kcal: 541, p: 37, f: 42, c: 1.4, cat: "Мясо" },
  { name: "Индейка варёная (100г)", kcal: 195, p: 29, f: 8, c: 0, cat: "Мясо" },
  { name: "Шаурма куриная (1 шт 300г)", kcal: 510, p: 30, f: 24, c: 46, cat: "Мясо" },
  { name: "Стейк говяжий (200г)", kcal: 440, p: 52, f: 24, c: 0, cat: "Мясо" },
  { name: "Куриные наггетсы (100г)", kcal: 297, p: 17, f: 17, c: 17, cat: "Мясо" },

  // ── Рыба и морепродукты ──
  { name: "Лосось запечённый (100г)", kcal: 208, p: 20, f: 13, c: 0, cat: "Рыба" },
  { name: "Тунец консервированный (100г)", kcal: 116, p: 26, f: 1, c: 0, cat: "Рыба" },
  { name: "Треска варёная (100г)", kcal: 98, p: 21, f: 0.9, c: 0, cat: "Рыба" },
  { name: "Скумбрия запечённая (100г)", kcal: 233, p: 21, f: 16, c: 0, cat: "Рыба" },
  { name: "Минтай жареный (100г)", kcal: 157, p: 22, f: 7, c: 2, cat: "Рыба" },
  { name: "Сельдь солёная (100г)", kcal: 217, p: 17, f: 16, c: 0, cat: "Рыба" },
  { name: "Креветки варёные (100г)", kcal: 99, p: 21, f: 1, c: 0, cat: "Рыба" },
  { name: "Роллы Филадельфия (6 шт 150г)", kcal: 320, p: 14, f: 11, c: 40, cat: "Рыба" },
  { name: "Икра красная (20г)", kcal: 58, p: 6, f: 3, c: 0.8, cat: "Рыба" },

  // ── Яйца и молочное ──
  { name: "Яйцо варёное (1 шт 60г)", kcal: 78, p: 6, f: 5, c: 0.6, cat: "Молочное" },
  { name: "Яйцо жареное (1 шт 60г)", kcal: 109, p: 7, f: 9, c: 0.4, cat: "Молочное" },
  { name: "Омлет из 2 яиц", kcal: 196, p: 14, f: 14, c: 2, cat: "Молочное" },
  { name: "Творог 5% (100г)", kcal: 121, p: 17, f: 5, c: 3, cat: "Молочное" },
  { name: "Творог 0% (100г)", kcal: 71, p: 16, f: 0.5, c: 2, cat: "Молочное" },
  { name: "Греческий йогурт (150г)", kcal: 130, p: 15, f: 4, c: 8, cat: "Молочное" },
  { name: "Йогурт фруктовый (125г)", kcal: 113, p: 4, f: 2.5, c: 19, cat: "Молочное" },
  { name: "Кефир 1% (200мл)", kcal: 80, p: 6, f: 2, c: 10, cat: "Молочное" },
  { name: "Молоко 2.5% (200мл)", kcal: 102, p: 5.6, f: 5, c: 9.4, cat: "Молочное" },
  { name: "Сыр Пармезан (30г)", kcal: 121, p: 11, f: 8, c: 0.9, cat: "Молочное" },
  { name: "Сыр Чеддер (30г)", kcal: 114, p: 7, f: 9, c: 0.4, cat: "Молочное" },
  { name: "Сыр Фета (50г)", kcal: 133, p: 7, f: 11, c: 1, cat: "Молочное" },
  { name: "Ряженка 2.5% (200мл)", kcal: 110, p: 5.5, f: 5, c: 11, cat: "Молочное" },
  { name: "Сметана 15% (30г)", kcal: 58, p: 0.9, f: 5, c: 1.5, cat: "Молочное" },
  { name: "Сливочное масло (10г)", kcal: 75, p: 0.1, f: 8.3, c: 0.1, cat: "Молочное" },

  // ── Злаки и каши ──
  { name: "Овсянка варёная на воде (200г)", kcal: 148, p: 5, f: 3, c: 27, cat: "Крупы" },
  { name: "Овсянка на молоке (250г)", kcal: 230, p: 8, f: 7, c: 36, cat: "Крупы" },
  { name: "Гречка варёная (100г)", kcal: 110, p: 4, f: 1, c: 21, cat: "Крупы" },
  { name: "Рис белый варёный (100г)", kcal: 130, p: 2.7, f: 0.3, c: 28, cat: "Крупы" },
  { name: "Рис бурый варёный (100г)", kcal: 111, p: 2.6, f: 0.9, c: 23, cat: "Крупы" },
  { name: "Перловка варёная (100г)", kcal: 109, p: 3, f: 0.4, c: 22, cat: "Крупы" },
  { name: "Пшённая каша (200г)", kcal: 202, p: 5.6, f: 4, c: 38, cat: "Крупы" },
  { name: "Кукурузная каша (200г)", kcal: 188, p: 4, f: 2.6, c: 40, cat: "Крупы" },
  { name: "Макароны варёные (100г)", kcal: 158, p: 5.5, f: 0.9, c: 31, cat: "Крупы" },
  { name: "Паста цельнозерновая варёная (100г)", kcal: 140, p: 5, f: 1, c: 27, cat: "Крупы" },
  { name: "Мюсли без сахара (50г)", kcal: 190, p: 5, f: 4, c: 34, cat: "Крупы" },
  { name: "Гранола (50г)", kcal: 228, p: 5, f: 8, c: 36, cat: "Крупы" },

  // ── Хлеб и выпечка ──
  { name: "Хлеб белый (1 ломтик 30г)", kcal: 80, p: 2.6, f: 0.9, c: 15, cat: "Хлеб" },
  { name: "Хлеб цельнозерновой (1 ломтик 30г)", kcal: 73, p: 3.5, f: 1, c: 13, cat: "Хлеб" },
  { name: "Хлеб ржаной (1 ломтик 30г)", kcal: 66, p: 2.2, f: 0.7, c: 13, cat: "Хлеб" },
  { name: "Лаваш тонкий (1 шт 55г)", kcal: 152, p: 5, f: 1, c: 31, cat: "Хлеб" },
  { name: "Багет (60г)", kcal: 167, p: 6, f: 1, c: 33, cat: "Хлеб" },
  { name: "Круассан (60г)", kcal: 231, p: 5, f: 12, c: 27, cat: "Хлеб" },
  { name: "Блин (1 шт 50г)", kcal: 133, p: 4, f: 6, c: 17, cat: "Хлеб" },
  { name: "Оладьи (2 шт 100г)", kcал: 220, p: 6, f: 8, c: 30, cat: "Хлеб" },
  { name: "Тост (1 шт 30г)", kcal: 88, p: 3, f: 1.2, c: 17, cat: "Хлеб" },
  { name: "Пита (1 шт 60г)", kcal: 165, p: 6, f: 1, c: 33, cat: "Хлеб" },

  // ── Бобовые ──
  { name: "Чечевица варёная (100г)", kcal: 116, p: 9, f: 0.4, c: 20, cat: "Бобовые" },
  { name: "Фасоль красная варёная (100г)", kcal: 127, p: 8.7, f: 0.5, c: 22, cat: "Бобовые" },
  { name: "Нут варёный (100г)", kcal: 164, p: 9, f: 3, c: 27, cat: "Бобовые" },
  { name: "Горох варёный (100г)", kcal: 115, p: 8, f: 0.4, c: 21, cat: "Бобовые" },
  { name: "Хумус (50г)", kcal: 118, p: 4, f: 7, c: 11, cat: "Бобовые" },
  { name: "Эдамаме (100г)", kcal: 121, p: 11, f: 5, c: 9, cat: "Бобовые" },

  // ── Овощи ──
  { name: "Брокколи варёная (100г)", kcal: 34, p: 2.8, f: 0.4, c: 7, cat: "Овощи" },
  { name: "Шпинат (100г)", kcal: 23, p: 2.9, f: 0.4, c: 3.6, cat: "Овощи" },
  { name: "Морковь сырая (1 шт 80г)", kcal: 33, p: 0.7, f: 0.2, c: 8, cat: "Овощи" },
  { name: "Огурец (1 шт 100г)", kcal: 15, p: 0.7, f: 0.1, c: 3, cat: "Овощи" },
  { name: "Помидор (1 шт 120г)", kcal: 22, p: 1, f: 0.2, c: 5, cat: "Овощи" },
  { name: "Сладкий перец (1 шт 120г)", kcal: 37, p: 1.2, f: 0.4, c: 8, cat: "Овощи" },
  { name: "Капуста белокочанная (100г)", kcal: 27, p: 1.8, f: 0.1, c: 6, cat: "Овощи" },
  { name: "Цветная капуста (100г)", kcal: 25, p: 1.9, f: 0.3, c: 5, cat: "Овощи" },
  { name: "Кабачок тушёный (100г)", kcal: 24, p: 1.5, f: 0.3, c: 4.5, cat: "Овощи" },
  { name: "Баклажан запечённый (100г)", kcal: 33, p: 1.6, f: 0.4, c: 6, cat: "Овощи" },
  { name: "Картофель варёный (100г)", kcal: 86, p: 1.7, f: 0.1, c: 20, cat: "Овощи" },
  { name: "Картофель жареный (100г)", kcal: 274, p: 4, f: 14, c: 34, cat: "Овощи" },
  { name: "Пюре картофельное (200г)", kcal: 200, p: 4, f: 7, c: 31, cat: "Овощи" },
  { name: "Кукуруза варёная (100г)", kcal: 96, p: 3.3, f: 1.3, c: 20, cat: "Овощи" },
  { name: "Свёкла варёная (100г)", kcal: 49, p: 1.9, f: 0.1, c: 11, cat: "Овощи" },
  { name: "Авокадо (1/2 шт 70г)", kcal: 120, p: 1.5, f: 11, c: 6, cat: "Овощи" },

  // ── Фрукты и ягоды ──
  { name: "Банан (1 шт 120г)", kcal: 107, p: 1.3, f: 0.4, c: 27, cat: "Фрукты" },
  { name: "Яблоко (1 шт 150г)", kcal: 78, p: 0.4, f: 0.4, c: 20, cat: "Фрукты" },
  { name: "Апельсин (1 шт 150г)", kcal: 71, p: 1.4, f: 0.2, c: 18, cat: "Фрукты" },
  { name: "Грейпфрут (1/2 шт 120г)", kcal: 52, p: 0.9, f: 0.1, c: 13, cat: "Фрукты" },
  { name: "Виноград (100г)", kcal: 69, p: 0.6, f: 0.2, c: 18, cat: "Фрукты" },
  { name: "Клубника (100г)", kcal: 33, p: 0.7, f: 0.3, c: 8, cat: "Фрукты" },
  { name: "Черника (100г)", kcal: 57, p: 0.7, f: 0.3, c: 14, cat: "Фрукты" },
  { name: "Манго (100г)", kcal: 65, p: 0.5, f: 0.3, c: 17, cat: "Фрукты" },
  { name: "Груша (1 шт 160г)", kcal: 86, p: 0.5, f: 0.3, c: 22, cat: "Фрукты" },
  { name: "Арбуз (200г)", kcal: 60, p: 1.2, f: 0.2, c: 15, cat: "Фрукты" },

  // ── Орехи и семена ──
  { name: "Миндаль (30г)", kcal: 173, p: 6, f: 15, c: 6, cat: "Орехи" },
  { name: "Грецкий орех (30г)", kcal: 196, p: 4.5, f: 19, c: 4, cat: "Орехи" },
  { name: "Кешью (30г)", kcal: 164, p: 4.5, f: 13, c: 9, cat: "Орехи" },
  { name: "Фундук (30г)", kcal: 188, p: 4, f: 18, c: 5, cat: "Орехи" },
  { name: "Арахисовая паста (30г)", kcal: 188, p: 7.7, f: 16, c: 6, cat: "Орехи" },
  { name: "Семена чиа (15г)", kcal: 73, p: 2.5, f: 4.5, c: 6, cat: "Орехи" },
  { name: "Тыквенные семечки (30г)", kcal: 168, p: 9, f: 14, c: 4, cat: "Орехи" },

  // ── Готовые блюда ──
  { name: "Борщ (300мл)", kcal: 138, p: 5, f: 5, c: 19, cat: "Готовые блюда" },
  { name: "Щи (300мл)", kcal: 105, p: 5, f: 4, c: 12, cat: "Готовые блюда" },
  { name: "Суп куриный (300мл)", kcal: 117, p: 9, f: 4, c: 12, cat: "Готовые блюда" },
  { name: "Суп-пюре тыквенный (300мл)", kcal: 135, p: 3, f: 5, c: 20, cat: "Готовые блюда" },
  { name: "Греческий салат (200г)", kcal: 214, p: 6, f: 18, c: 10, cat: "Готовые блюда" },
  { name: "Цезарь с курицей (250г)", kcal: 370, p: 28, f: 23, c: 14, cat: "Готовые блюда" },
  { name: "Оливье (200г)", kcal: 296, p: 7, f: 22, c: 19, cat: "Готовые блюда" },
  { name: "Солянка (300мл)", kcal: 180, p: 12, f: 9, c: 14, cat: "Готовые блюда" },
  { name: "Жаркое с картофелем (300г)", kcal: 357, p: 20, f: 18, c: 29, cat: "Готовые блюда" },
  { name: "Плов (200г)", kcal: 304, p: 13, f: 12, c: 38, cat: "Готовые блюда" },
  { name: "Лазанья (250г)", kcal: 388, p: 20, f: 17, c: 41, cat: "Готовые блюда" },
  { name: "Ризотто (200г)", kcal: 290, p: 8, f: 10, c: 43, cat: "Готовые блюда" },
  { name: "Паста болоньезе (300г)", kcal: 486, p: 24, f: 15, c: 65, cat: "Готовые блюда" },
  { name: "Паста карбонара (300г)", kcal: 570, p: 24, f: 26, c: 65, cat: "Готовые блюда" },
  { name: "Сырники (2 шт 120г)", kcal: 282, p: 18, f: 10, c: 30, cat: "Готовые блюда" },
  { name: "Гречка с курицей (350г)", kcal: 420, p: 38, f: 8, c: 48, cat: "Готовые блюда" },
  { name: "Рис с овощами (300г)", kcal: 330, p: 7, f: 5, c: 66, cat: "Готовые блюда" },
  { name: "Куриный стир-фрай (300г)", kcal: 390, p: 34, f: 14, c: 32, cat: "Готовые блюда" },
  { name: "Котлета паровая + пюре (300г)", kcal: 485, p: 28, f: 22, c: 44, cat: "Готовые блюда" },
  { name: "Голубцы (2 шт 200г)", kcal: 282, p: 14, f: 13, c: 28, cat: "Готовые блюда" },

  // ── Фастфуд ──
  { name: "Бургер (1 шт 200г)", kcal: 490, p: 25, f: 26, c: 43, cat: "Фастфуд" },
  { name: "Чизбургер (1 шт 150г)", kcal: 359, p: 17, f: 17, c: 35, cat: "Фастфуд" },
  { name: "Картофель фри (100г)", kcal: 312, p: 3.4, f: 15, c: 41, cat: "Фастфуд" },
  { name: "Пицца Маргарита (1 кусок 120г)", kcal: 285, p: 11, f: 10, c: 39, cat: "Фастфуд" },
  { name: "Пицца с пепперони (1 кусок 120г)", kcal: 330, p: 13, f: 15, c: 37, cat: "Фастфуд" },
  { name: "Хот-дог (1 шт 150г)", kcal: 375, p: 15, f: 20, c: 35, cat: "Фастфуд" },
  { name: "Сэндвич с курицей (200г)", kcal: 410, p: 28, f: 16, c: 40, cat: "Фастфуд" },

  // ── Сладости и десерты ──
  { name: "Шоколад тёмный (30г)", kcal: 170, p: 2.3, f: 12, c: 16, cat: "Сладости" },
  { name: "Шоколад молочный (30г)", kcal: 160, p: 2, f: 9.3, c: 18, cat: "Сладости" },
  { name: "Мороженое пломбир (100г)", kcal: 227, p: 3.5, f: 12, c: 27, cat: "Сладости" },
  { name: "Творожный сырок (50г)", kcal: 170, p: 6, f: 11, c: 13, cat: "Сладости" },
  { name: "Протеиновый батончик (60г)", kcal: 215, p: 20, f: 7, c: 20, cat: "Сладости" },
  { name: "Зефир (2 шт 30г)", kcal: 94, p: 0.8, f: 0, c: 23, cat: "Сладости" },
  { name: "Печенье овсяное (3 шт 60г)", kcal: 255, p: 4, f: 9, c: 40, cat: "Сладости" },
  { name: "Банановый смузи (300мл)", kcal: 195, p: 5, f: 0.8, c: 44, cat: "Сладости" },

  // ── Напитки ──
  { name: "Кофе чёрный (200мл)", kcal: 4, p: 0.3, f: 0, c: 0.7, cat: "Напитки" },
  { name: "Капучино (250мл)", kcal: 120, p: 6, f: 5, c: 12, cat: "Напитки" },
  { name: "Латте (350мл)", kcal: 185, p: 9, f: 7, c: 22, cat: "Напитки" },
  { name: "Чай зелёный (200мл)", kcal: 2, p: 0.2, f: 0, c: 0.4, cat: "Напитки" },
  { name: "Апельсиновый сок (200мл)", kcal: 90, p: 1.4, f: 0.2, c: 21, cat: "Напитки" },
  { name: "Протеиновый шейк (350мл)", kcal: 210, p: 30, f: 3, c: 18, cat: "Напитки" },
];

// Синонимы и народные названия → ключи для поиска
const SYNONYMS = {
  "картошка фри": "Картофель жареный (100г)",
  "картофель фри": "Картофель жареный (100г)",
  "фри": "Картофель жареный (100г)",
  "жареная картошка": "Картофель жареный (100г)",
  "картошка": "Картофель варёный (100г)",
  "пюрешка": "Пюре картофельное (200г)",
  "пюре": "Пюре картофельное (200г)",
  "куриная грудь": "Куриная грудка варёная (100г)",
  "грудка": "Куриная грудка варёная (100г)",
  "курица": "Куриная грудка варёная (100г)",
  "куриное филе": "Куриная грудка варёная (100г)",
  "яйца": "Яйцо варёное (1 шт 60г)",
  "яйцо": "Яйцо варёное (1 шт 60г)",
  "яичница": "Яйцо жареное (1 шт 60г)",
  "каша": "Овсянка варёная на воде (200г)",
  "овсянка": "Овсянка варёная на воде (200г)",
  "геркулес": "Овсянка варёная на воде (200г)",
  "гречка": "Гречка варёная (100г)",
  "гречневая каша": "Гречка варёная (100г)",
  "рис": "Рис белый варёный (100г)",
  "макарошки": "Макароны варёные (100г)",
  "макароны": "Макароны варёные (100г)",
  "паста": "Макароны варёные (100г)",
  "творог": "Творог 5% (100г)",
  "йогурт": "Греческий йогурт (150г)",
  "кефир": "Кефир 1% (200мл)",
  "молоко": "Молоко 2.5% (200мл)",
  "сыр": "Сыр Чеддер (30г)",
  "протеин": "Протеиновый батончик (60г)",
  "батончик": "Протеиновый батончик (60г)",
  "шейк": "Протеиновый шейк (350мл)",
  "протеиновый коктейль": "Протеиновый шейк (350мл)",
  "рыба": "Лосось запечённый (100г)",
  "лосось": "Лосось запечённый (100г)",
  "семга": "Лосось запечённый (100г)",
  "тунец": "Тунец консервированный (100г)",
  "говядина": "Говядина варёная (100г)",
  "говяжий стейк": "Стейк говяжий (200г)",
  "стейк": "Стейк говяжий (200г)",
  "бургер": "Бургер (1 шт 200г)",
  "гамбургер": "Бургер (1 шт 200г)",
  "пицца": "Пицца Маргарита (1 кусок 120г)",
  "шаурма": "Шаурма куриная (1 шт 300г)",
  "борщ": "Борщ (300мл)",
  "суп": "Суп куриный (300мл)",
  "плов": "Плов (200г)",
  "банан": "Банан (1 шт 120г)",
  "яблоко": "Яблоко (1 шт 150г)",
  "апельсин": "Апельсин (1 шт 150г)",
  "авокадо": "Авокадо (1/2 шт 70г)",
  "миндаль": "Миндаль (30г)",
  "орехи": "Грецкий орех (30г)",
  "грецкий орех": "Грецкий орех (30г)",
  "кофе": "Кофе чёрный (200мл)",
  "капучино": "Капучино (250мл)",
  "латте": "Латте (350мл)",
  "брокколи": "Брокколи варёная (100г)",
  "шпинат": "Шпинат (100г)",
  "огурец": "Огурец (1 шт 100г)",
  "помидор": "Помидор (1 шт 120г)",
  "томат": "Помидор (1 шт 120г)",
  "блины": "Блин (1 шт 50г)",
  "блин": "Блин (1 шт 50г)",
  "оладьи": "Оладьи (2 шт 100г)",
  "сырники": "Сырники (2 шт 120г)",
  "пельмени": "Пельмени варёные (100г)",
  "котлета": "Котлета говяжья (1 шт 80г)",
  "сосиска": "Сосиска молочная (1 шт 50г)",
  "колбаса": "Колбаса докторская (100г)",
  "хлеб": "Хлеб цельнозерновой (1 ломтик 30г)",
  "бутерброд": "Хлеб цельнозерновой (1 ломтик 30г)",
  "мороженое": "Мороженое пломбир (100г)",
  "шоколад": "Шоколад тёмный (30г)",
  "чечевица": "Чечевица варёная (100г)",
  "нут": "Нут варёный (100г)",
  "фасоль": "Фасоль красная варёная (100г)",
  "наггетсы": "Куриные наггетсы (100г)",
  "роллы": "Роллы Филадельфия (6 шт 150г)",
  "суши": "Роллы Филадельфия (6 шт 150г)",
  "греческий салат": "Греческий салат (200г)",
  "цезарь": "Цезарь с курицей (250г)",
  "оливье": "Оливье (200г)",
};

const QUICK_FOODS = [
  "Куриная грудка варёная (100г)", "Яйцо варёное (1 шт 60г)", "Овсянка варёная на воде (200г)",
  "Творог 5% (100г)", "Гречка варёная (100г)", "Банан (1 шт 120г)",
  "Греческий йогурт (150г)", "Тунец консервированный (100г)", "Рис белый варёный (100г)", "Авокадо (1/2 шт 70г)",
];

function calcTDEE({ gender, age, weight, height, activity, goal }) {
  if (!weight || !height || !age) return 1800;
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const mult = { min: 1.2, light: 1.375, moderate: 1.55, high: 1.725 };
  const adj = { lose: -500, maintain: 0, gain: 300 };
  return Math.round(bmr * (mult[activity] || 1.375) + (adj[goal] || 0));
}

function getRecommendation(eaten, tdee) {
  const totalKcal = eaten.reduce((s, i) => s + i.kcal, 0);
  const totalP = eaten.reduce((s, i) => s + i.p, 0);
  const totalC = eaten.reduce((s, i) => s + i.c, 0);
  const remaining = tdee - totalKcal;
  const pct = tdee > 0 ? totalKcal / tdee : 0;
  if (pct > 1) return { dish: null, icon: "🌙", title: "Норма выполнена", reason: "Вы превысили дневную норму. Это случается — не корите себя. Завтра начните день с лёгкого завтрака (протеин + овощи).", tag: "over" };
  if (remaining < 200 && remaining > 0) return { dish: FOOD_DB.find(f => f.name === "Морковь (1 шт)"), icon: "🥕", title: "Финальный перекус", reason: `Осталось ${Math.round(remaining)} ккал — идеально для лёгкого перекуса.`, tag: "snack" };
  if (totalP < 60) return { dish: FOOD_DB.find(f => f.name === "Куриная грудка (100г)"), icon: "💪", title: "Нужно больше белка", reason: `Только ${Math.round(totalP)}г белка. Белок сохраняет мышцы при дефиците и даёт насыщение.`, tag: "protein" };
  if (totalC < 100 && remaining > 300) return { dish: FOOD_DB.find(f => f.name === "Гречка варёная (100г)"), icon: "🌾", title: "Добавьте медленные углеводы", reason: `Всего ${Math.round(totalC)}г углеводов. Гречка даёт устойчивую энергию.`, tag: "carbs" };
  if (pct < 0.5) return { dish: FOOD_DB.find(f => f.name === "Лосось (100г)"), icon: "🐟", title: "Вы мало съели", reason: "Съедено менее половины нормы. Сильный дефицит замедляет метаболизм.", tag: "hungry" };
  return { dish: FOOD_DB.find(f => f.name === "Греческий йогурт (150г)"), icon: "✅", title: "Отличный баланс!", reason: "БЖУ в хорошем балансе. Греческий йогурт добавит белок без перегруза.", tag: "good" };
}

const TODAY = new Date();
function getWeekDays() {
  const days = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(TODAY);
    d.setDate(TODAY.getDate() + i - 2);
    return { label: days[d.getDay()], num: d.getDate(), active: i === 2 };
  });
}

export default function CalorieAI() {
  const [profile, setProfile] = useState({ gender: "female", age: 28, weight: 65, height: 168, activity: "moderate", goal: "lose" });
  const [profileOpen, setProfileOpen] = useState(false);
  const [eaten, setEaten] = useState([]);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const searchTimer = useRef(null);

  useEffect(() => {
    const onResize = () => {
      if (window.visualViewport) {
        const offset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
        setKeyboardOffset(Math.max(0, offset));
      }
    };
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onResize);
    };
  }, []);

  // Умный локальный поиск — сначала синонимы, потом по словам
  function localSearch(q) {
    const ql = q.toLowerCase().trim();
    // Точное совпадение с синонимом
    const synName = SYNONYMS[ql];
    const synResult = synName ? FOOD_DB.filter(f => f.name === synName) : [];
    // Частичное совпадение с синонимами
    const partialSyn = Object.entries(SYNONYMS)
      .filter(([k]) => ql.includes(k) || k.includes(ql))
      .map(([, v]) => FOOD_DB.find(f => f.name === v))
      .filter(Boolean);
    // Поиск по словам в базе
    const words = ql.split(/\s+/).filter(w => w.length > 1);
    const byWords = FOOD_DB.filter(f => {
      const name = f.name.toLowerCase();
      return words.some(w => name.includes(w));
    });
    // Объединяем без дублей
    const seen = new Set();
    const all = [...synResult, ...partialSyn, ...byWords].filter(f => {
      if (seen.has(f.name)) return false;
      seen.add(f.name); return true;
    });
    return all.slice(0, 6);
  }

  // ИИ определяет КБЖУ через DeepSeek (через Netlify Function)
  async function askAIForFood(q) {
    if (!q || q.length < 2) return;
    setIsSearching(true);
    try {
      const res = await fetch(`/.netlify/functions/food-search?q=${encodeURIComponent(q)}`);
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        const aiResults = items.map(i => ({
          ...i, cat: "🤖 ИИ",
          kcal: Math.round(i.kcal),
          p: Math.round(i.p * 10) / 10,
          f: Math.round(i.f * 10) / 10,
          c: Math.round(i.c * 10) / 10,
        }));
        const local = localSearch(q);
        const localNames = new Set(local.map(f => f.name.toLowerCase()));
        const merged = [...local, ...aiResults.filter(a => !localNames.has(a.name.toLowerCase()))].slice(0, 8);
        setSuggestions(merged.length > 0 ? merged : aiResults);
      }
    } catch {
      setSuggestions(localSearch(q));
    }
    setIsSearching(false);
  }

  const tdee = calcTDEE(profile);
  const totalKcal = Math.round(eaten.reduce((s, i) => s + i.kcal, 0));
  const totalP = Math.round(eaten.reduce((s, i) => s + i.p, 0));
  const totalF = Math.round(eaten.reduce((s, i) => s + i.f, 0));
  const totalC = Math.round(eaten.reduce((s, i) => s + i.c, 0));
  const remaining = tdee - totalKcal;
  const pct = Math.min(totalKcal / tdee, 1);
  const pPct = Math.round((totalP * 4) / Math.max(totalKcal, 1) * 100);
  const fPct = Math.round((totalF * 9) / Math.max(totalKcal, 1) * 100);
  const cPct = Math.round((totalC * 4) / Math.max(totalKcal, 1) * 100);
  const rec = getRecommendation(eaten, tdee);
  const weekDays = getWeekDays();
  const barColor = remaining < 0 ? "#FF3B30" : pct > 0.8 ? "#FF9500" : "#4A9EFF";

  function addFood(food) { setEaten(prev => [...prev, { ...food, id: Date.now() + Math.random() }]); }
  function removeFood(id) { setEaten(prev => prev.filter(i => i.id !== id)); }

  function handleSearchChange(val) {
    setSearch(val);
    clearTimeout(searchTimer.current);
    if (!val.trim()) { setSuggestions([]); return; }
    setSuggestions(localSearch(val));
    searchTimer.current = setTimeout(() => askAIForFood(val), 700);
  }

  function selectSuggestion(food) {
    addFood(food);
    setSearch("");
    setSuggestions([]);
    setSearchError("");
  }

  function handleSearch() {
    if (suggestions.length > 0) { selectSuggestion(suggestions[0]); return; }
    if (!search.trim()) return;
    askAIForFood(search);
  }
  function updateProfile(k, v) { setProfile(p => ({ ...p, [k]: v })); }
  function askAI() {
    if (typeof sendPrompt !== "function") return;
    const list = eaten.map(i => `• ${i.name}: ${i.kcal} ккал`).join("\n");
    sendPrompt(`Моя норма TDEE: ${tdee} ккал.\nСегодня съел(а):\n${list || "(ничего)"}\nИтого: ${totalKcal} ккал | Б: ${totalP}г | Ж: ${totalF}г | У: ${totalC}г\nОстаток: ${remaining} ккал\nДай подробные рекомендации по питанию.`);
  }

  return (
    <div style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif", background: "#F2F2F7", minHeight: "100dvh", width: "100%" }}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        @keyframes slideUp { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg) } }
      `}</style>

      {/* ── Hero header ── */}
      <div style={{ background: "linear-gradient(160deg, #A8C8F8 0%, #BDD5F9 35%, #D0E3FB 65%, #E4EFFE 100%)", borderRadius: "0 0 32px 32px", paddingBottom: 24 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 0" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#1C3A5E" }}>9:41</span>
          <button onClick={() => setProfileOpen(true)} style={{ background: "rgba(255,255,255,0.5)", border: "none", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#1C3A5E", cursor: "pointer" }}>
            Профиль
          </button>
        </div>

        {/* Week strip */}
        <div style={{ display: "flex", justifyContent: "space-around", padding: "18px 16px 0" }}>
          {weekDays.map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: d.active ? "#1C3A5E" : "rgba(28,58,94,0.45)" }}>{d.label}</span>
              <div style={{ width: 34, height: 34, borderRadius: 11, background: d.active ? "rgba(255,255,255,0.65)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, fontWeight: d.active ? 700 : 400, color: d.active ? "#1A2D50" : "rgba(28,58,94,0.55)" }}>{d.num}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big number */}
        <div style={{ textAlign: "center", paddingTop: 28 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-5px", color: "#1A2D50", lineHeight: 1 }}>{totalKcal}</div>
          <div style={{ fontSize: 14, color: "rgba(28,58,94,0.55)", marginTop: 8, fontWeight: 500, letterSpacing: "0.03em" }}>Калории &nbsp;·&nbsp; из {tdee}</div>

          {/* Thin progress bar */}
          <div style={{ margin: "16px auto 0", width: "75%" }}>
            <div style={{ height: 3, background: "rgba(255,255,255,0.35)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round(pct * 100)}%`, background: barColor, borderRadius: 3, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 11, color: "rgba(28,58,94,0.45)" }}>
              <span>0</span>
              <span style={{ color: barColor, fontWeight: 600 }}>{Math.round(pct * 100)}%</span>
              <span>{tdee}</span>
            </div>
          </div>
        </div>

        {/* Macro cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, padding: "20px 16px 0" }}>
          {[
            { label: "Белки", pct: pPct, g: totalP },
            { label: "Углеводы", pct: cPct, g: totalC },
            { label: "Жиры", pct: fPct, g: totalF },
          ].map(m => (
            <div key={m.label} style={{ background: "rgba(255,255,255,0.55)", borderRadius: 16, padding: "12px 8px", textAlign: "center", border: "0.5px solid rgba(255,255,255,0.6)" }}>
              <div style={{ fontSize: 11, color: "rgba(28,58,94,0.55)", fontWeight: 500, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1A2D50", letterSpacing: "-0.5px" }}>{m.pct}%</div>
              <div style={{ fontSize: 11, color: "rgba(28,58,94,0.45)", marginTop: 2 }}>{m.g}г</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "22px 16px 100px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ─ Советы ─ */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 12, letterSpacing: "-0.3px" }}>Советы</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* AI rec card */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "18px 18px 16px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #4A9EFF 0%, #34C759 100%)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#8E8E93", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Рекомендация ИИ</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A" }}>{rec.title}</div>
                </div>
                <span style={{ fontSize: 26 }}>{rec.icon}</span>
              </div>
              {rec.dish && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F2F2F7", borderRadius: 14, padding: "10px 14px", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{rec.dish.name}</div>
                    <div style={{ fontSize: 12, color: "#8E8E93", marginTop: 1 }}>{rec.dish.kcal} ккал</div>
                  </div>
                  <button onClick={() => addFood(rec.dish)} style={{ background: "#1A7BEF", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>+ Добавить</button>
                </div>
              )}
              <div style={{ fontSize: 13, color: "#636366", lineHeight: 1.65, marginBottom: 14 }}>{rec.reason}</div>
              <button onClick={askAI} style={{ width: "100%", background: "#F2F2F7", border: "none", borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 600, color: "#1A7BEF", cursor: "pointer", fontFamily: "inherit" }}>
                Спросить ИИ подробнее →
              </button>
            </div>

            {/* Nutrient bars */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: "#8E8E93", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Баланс нутриентов</div>
              {[
                { label: "Белки", val: totalP, target: Math.round(tdee * 0.3 / 4), color: "#34C759" },
                { label: "Углеводы", val: totalC, target: Math.round(tdee * 0.45 / 4), color: "#FF9500" },
                { label: "Жиры", val: totalF, target: Math.round(tdee * 0.25 / 9), color: "#FF3B30" },
              ].map(n => (
                <div key={n.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>{n.label}</span>
                    <span style={{ fontSize: 12, color: "#8E8E93" }}>{n.val}г / {n.target}г</span>
                  </div>
                  <div style={{ height: 5, background: "#F2F2F7", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(Math.round(n.val / n.target * 100), 100)}%`, background: n.color, borderRadius: 3, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─ Быстрое добавление ─ */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 12, letterSpacing: "-0.3px" }}>Добавить</div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "16px" }}>
            <div style={{ fontSize: 11, color: "#8E8E93", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Быстрое добавление</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUICK_FOODS.map(name => {
                const f = FOOD_DB.find(d => d.name === name);
                return (
                  <button key={name} onClick={() => f && addFood(f)}
                    style={{ background: "#F2F2F7", border: "none", borderRadius: 20, padding: "8px 14px", fontSize: 13, fontWeight: 500, color: "#1A1A1A", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                    <span>{name.split(" (")[0]}</span>
                    <span style={{ fontSize: 11, color: "#8E8E93" }}>{f?.kcal} ккал</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─ Приёмы пищи ─ */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 12, letterSpacing: "-0.3px" }}>Приёмы пищи</div>
          {eaten.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 20, padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🍽️</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginBottom: 4 }}>Пока ничего</div>
              <div style={{ fontSize: 13, color: "#8E8E93" }}>Добавьте продукт через поиск или быстрые кнопки выше</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {eaten.map(item => (
                <div key={item.id} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[["Б", Math.round(item.p), "#34C759"], ["У", Math.round(item.c), "#FF9500"], ["Ж", Math.round(item.f), "#FF3B30"]].map(([l, v, c]) => (
                        <span key={l} style={{ fontSize: 11, fontWeight: 600, color: c, background: c + "18", padding: "2px 8px", borderRadius: 6 }}>{l} {v}г</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap" }}>{Math.round(item.kcal)} ккал</div>
                  <button onClick={() => removeFood(item.id)} style={{ background: "#F2F2F7", border: "none", width: 28, height: 28, borderRadius: 14, cursor: "pointer", fontSize: 15, color: "#8E8E93", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "inherit" }}>×</button>
                </div>
              ))}
              <div style={{ background: remaining < 0 ? "#FFF0EE" : "#EEF4FF", borderRadius: 16, padding: "14px 18px", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#8E8E93", fontWeight: 600, marginBottom: 2 }}>ОСТАТОК</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: remaining < 0 ? "#FF3B30" : "#1A7BEF", letterSpacing: "-0.5px" }}>{remaining} ккал</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#8E8E93", fontWeight: 600, marginBottom: 2 }}>НОРМА</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1A2D50", letterSpacing: "-0.5px" }}>{tdee} ккал</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Fixed bottom input bar ── */}
      <div style={{ position: "fixed", bottom: keyboardOffset, left: 0, right: 0, width: "100%", zIndex: 30, transition: "bottom 0.1s" }}>
        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div style={{ background: "#fff", borderTop: "0.5px solid rgba(0,0,0,0.08)", maxHeight: 280, overflowY: "auto" }}>
            {suggestions.map((s, i) => (
              <div key={i} onClick={() => selectSuggestion(s)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderBottom: "0.5px solid #F2F2F7", cursor: "pointer", background: "#fff" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#8E8E93", marginTop: 2 }}>Б {s.p}г · Ж {s.f}г · У {s.c}г</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1A7BEF", marginLeft: 12, whiteSpace: "nowrap" }}>{s.kcal} ккал</div>
              </div>
            ))}
          </div>
        )}
        {/* Input bar */}
        <div style={{ background: "rgba(242,242,247,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "0.5px solid rgba(0,0,0,0.08)", padding: "12px 16px", paddingBottom: keyboardOffset > 0 ? "12px" : "calc(12px + env(safe-area-inset-bottom, 0px))", boxSizing: "border-box" }}>
          {searchError && <div style={{ fontSize: 12, color: "#FF9500", marginBottom: 6, paddingLeft: 2 }}>{searchError}</div>}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input ref={inputRef}
                style={{ width: "100%", padding: "12px 16px", fontSize: 15, border: "none", background: "#fff", borderRadius: 14, outline: "none", color: "#1A1A1A", fontFamily: "inherit", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", boxSizing: "border-box" }}
                placeholder="Поиск продукта или блюда…"
                value={search}
                onChange={e => handleSearchChange(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
              {isSearching && <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, border: "2px solid #E5E5EA", borderTopColor: "#1A7BEF", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />}
            </div>
            <button onClick={handleSearch} style={{ background: "#1A7BEF", border: "none", borderRadius: 14, padding: "12px 20px", fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0 }}>
              Добавить
            </button>
          </div>
        </div>
      </div>

      {/* ── Profile bottom sheet ── */}
      {profileOpen && (
        <>
          <div onClick={() => setProfileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40, animation: "fadeIn 0.2s" }} />
          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(430px, 100vw)", background: "#fff", borderRadius: "24px 24px 0 0", zIndex: 50, padding: "0 20px 44px", boxSizing: "border-box", animation: "slideUp 0.28s cubic-bezier(0.4,0,0.2,1)", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ width: 36, height: 4, background: "#E5E5EA", borderRadius: 2, margin: "14px auto 18px" }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 22, textAlign: "center" }}>Профиль</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Пол", key: "gender", type: "select", opts: [["male","Мужской"],["female","Женский"]] },
                { label: "Возраст", key: "age", type: "number", min: 10, max: 100 },
                { label: "Вес (кг)", key: "weight", type: "number", min: 30, max: 300 },
                { label: "Рост (см)", key: "height", type: "number", min: 100, max: 250 },
                { label: "Активность", key: "activity", type: "select", opts: [["min","Минимальная"],["light","Лёгкая"],["moderate","Умеренная"],["high","Высокая"]] },
                { label: "Цель", key: "goal", type: "select", opts: [["lose","Похудеть"],["maintain","Поддержать вес"],["gain","Набрать массу"]] },
              ].map(field => (
                <div key={field.key}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#8E8E93", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{field.label}</div>
                  {field.type === "select" ? (
                    <select value={profile[field.key]} onChange={e => updateProfile(field.key, e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", fontSize: 15, border: "none", background: "#F2F2F7", borderRadius: 12, outline: "none", color: "#1A1A1A", fontFamily: "inherit", cursor: "pointer", appearance: "none" }}>
                      {field.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  ) : (
                    <input type="number" min={field.min} max={field.max} value={profile[field.key]} onChange={e => updateProfile(field.key, +e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", fontSize: 15, border: "none", background: "#F2F2F7", borderRadius: 12, outline: "none", color: "#1A1A1A", fontFamily: "inherit", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}

              <div style={{ background: "linear-gradient(120deg, #A8C8F8 0%, #C5D8F8 100%)", borderRadius: 16, padding: "16px 18px", textAlign: "center", marginTop: 2 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1C3A5E", opacity: 0.65, marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Ваша норма</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: "#1A2D50", letterSpacing: "-1.5px" }}>{tdee} <span style={{ fontSize: 16, fontWeight: 500 }}>ккал/день</span></div>
              </div>

              <button onClick={() => setProfileOpen(false)} style={{ width: "100%", background: "#1A7BEF", border: "none", borderRadius: 14, padding: "15px", fontSize: 16, fontWeight: 600, color: "#fff", cursor: "pointer", marginTop: 4, fontFamily: "inherit" }}>
                Готово
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
