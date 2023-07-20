import { __, allPass, any, compose, countBy, dissoc, equals, gte, identity, not, prop, propEq, values } from "ramda";

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
// console.log для проверки
const log = (a) => {
  console.log(a);
  return a;
};
// Получаем поле объекта
const star = prop("star");
const square = prop("square");
const triangle = prop("triangle");
const circle = prop("circle");
const green = prop("green");

const dissocWhite = dissoc("white");

// Проверка цветов
// @ts-ignore
const numberOfColors = compose(countBy(identity), values);
const isWhite = equals("white");
const isRed = equals("red");
const isGreen = equals("green");
const isBlue = equals("blue");
const isOrange = equals("orange");
const isTwoGreenProps = propEq("green", 2);
const isOneRedProps = propEq("red", 1);
const isFourOrangeProps = propEq("orange", 4);
const isFourGreenProps = propEq("green", 4);
// @ts-ignore
const twoGreenColors = compose(isTwoGreenProps, numberOfColors);
// @ts-ignore
const oneRedColor = compose(isOneRedProps, numberOfColors);
// @ts-ignore
const fourOrangeColor = compose(isFourOrangeProps, numberOfColors);
// @ts-ignore
const fourGreenColor = compose(isFourGreenProps, numberOfColors);

// Композиции, compose
const isTriangleWhite = compose(isWhite, triangle);
const isTriangleGreen = compose(isGreen, triangle);

const isCircleWhite = compose(isWhite, circle);
const isCircleBlue = compose(isBlue, circle);

const isStarRed = compose(isRed, star);
const isStarNotRed = compose(not, isRed, star);
const isStarNotWhite = compose(not, isWhite, star);

const isSquareGreen = compose(isGreen, square);
const isSquareBlue = compose(isBlue, square);
const isSquareOrange = compose(isOrange, square);
const isSquareNotWhite = compose(not, isWhite, square);

const numberOfGreenColors = compose(green, numberOfColors);
const numberOfColorsWhitoutWhite = compose(dissocWhite, numberOfColors);

// Сложные условия, проверки
const moreOrEqualsTwo = gte(__, 2);
const moreOrEqualsThree = gte(__, 3);
const squareEqualsTriangle = ({ square, triangle }) => square === triangle;
const anyGreaterOrEqualsThenThree = any(moreOrEqualsThree);
const anyValueGreaterOrEqualsThenThree = compose(anyGreaterOrEqualsThenThree, values);
const redEqualsBlue = ({ blue, red }) => blue === red;

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isStarRed, isSquareGreen, isTriangleWhite, isCircleWhite]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(moreOrEqualsTwo, numberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqualsBlue, log, numberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isCircleBlue, isStarRed, isSquareOrange]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueGreaterOrEqualsThenThree, numberOfColorsWhitoutWhite);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isTriangleGreen, twoGreenColors, oneRedColor]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = fourOrangeColor;

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isStarNotWhite, isStarNotRed]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = fourGreenColor;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isSquareNotWhite, squareEqualsTriangle]);
