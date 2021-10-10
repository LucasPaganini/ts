import {
  isArray,
  isBoolean,
  isEmpty,
  isEqual as isDeepEqual,
  isFunction,
  isInteger as lodashIsInteger,
  isNil,
  isNull,
  isNumber,
  isString,
  isUndefined,
} from 'lodash-es'
import { PredicateFn } from '../core/predicate-fn'

export { isArray, isBoolean, isEmpty, isDeepEqual, isFunction, isNil, isNull, isNumber, isString, isUndefined }

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
export const isInteger = lodashIsInteger as PredicateFn<number>
