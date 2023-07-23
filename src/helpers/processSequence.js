/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
  __,
  allPass,
  andThen,
  assoc,
  compose,
  length,
  concat,
  gt,
  ifElse,
  lt,
  prop,
  test,
  mathMod,
  otherwise,
} from "ramda";
import Api from "../tools/api";
const consoleLog = (a) => {
  console.log(a);
  return a;
};
//
const numRound = compose(Math.round, Number);
const getLength = prop("length");
const getNumLength = compose(length, String);
const thenGetLength = andThen(getNumLength);
const square = (num) => num * num;
const thenSquare = andThen(square);
const modForThreeToString = compose(String, mathMod(__, 3), Number);
const andThenModForThreeToString = andThen(modForThreeToString);
// API
const api = new Api();
const NUMBER_API_URL = "https://api.tech/numbers/base";
const ANIMALS_API_URL = "https://animals.tech/";
const getApiResult = compose(String, prop("result"));
const assocNumberToBinary = assoc("number", __, { from: 10, to: 2 });
const apiGetNumberBinaryBase = compose(api.get(NUMBER_API_URL), assocNumberToBinary);
const thenGetApiResult = andThen(getApiResult);
const thenConcatToAnimalsUrl = andThen(concat(ANIMALS_API_URL));
const thenCallApiWithEmptyParams = andThen(api.get(__, {}));
// Валидация
const lessThenTen = lt(__, 10);
const greaterThenTwo = gt(__, 2);
const greaterThenZero = gt(__, 0);
const isStrNumLessThenTen = compose(lessThenTen, getLength);
const isStrNumMoreThenTwo = compose(greaterThenTwo, getLength);
const numIsPositive = compose(greaterThenZero, Number);
const isOnlyNumbersInStr = test(/^[0-9]+\.?[0-9]+$/);
const validate = allPass([isStrNumLessThenTen, isStrNumMoreThenTwo, numIsPositive, isOnlyNumbersInStr]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const logError = () => handleError("ValidationError");
  const log = (a) => {
    writeLog(a);
    return a;
  };
  const thenLog = andThen(log);

  const thenHandleSuccess = andThen(handleSuccess);
  const otherwiseHandleError = otherwise(handleError);

  const composition = compose(
    otherwiseHandleError,
    thenHandleSuccess,
    thenGetApiResult,
    thenCallApiWithEmptyParams,
    thenConcatToAnimalsUrl,
    thenLog,
    andThenModForThreeToString,
    thenLog,
    thenSquare,
    thenLog,
    thenGetLength,
    thenLog,
    thenGetApiResult,
    apiGetNumberBinaryBase,
    log,
    numRound,
    log
  );
  const runValidated = ifElse(validate, composition, logError);
  runValidated(value);
};

export default processSequence;
