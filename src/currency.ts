import { Currency } from "dinero.js";
import { CURRENCY_CODE } from "./env";

export const currency: Currency<number> = {
  code: CURRENCY_CODE,
  base: 10,
  exponent: 2,
};
