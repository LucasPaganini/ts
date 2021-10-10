/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { makeIsNot } from '../is-not'
import {
  isArray,
  isBoolean,
  isDeepEqual,
  isEmpty,
  isFunction,
  isNil,
  isNull,
  isNumber,
  isString,
  isUndefined,
} from './from-lodash'

/**
 * Returns false if a value is classified as a String primitive or object.
 *
 * This function is a type guard, guaranteeing the value is **not** a string.
 *
 * @param v The value to check
 */
export const isNotString = makeIsNot(isString)

/**
 * Returns false if a value is classified as a Number primitive or object.
 *
 * This function is a type guard, guaranteeing the value is **not** a number.
 *
 * @param v The value to check
 */
export const isNotNumber = makeIsNot(isNumber)

/**
 * Returns false if a value is classified as a boolean primitive or object.
 *
 * This function is a type guard, guaranteeing the value is **not** a boolean.
 *
 * @param v The value to check
 */
export const isNotBoolean = makeIsNot(isBoolean)

/**
 * Returns false if a value is `undefined`.
 *
 * This function is a type guard, guaranteeing the value is **not** `undefined`.
 *
 * Refer to {@link isNotNil} if you want to check for `undefined` AND `null`
 *
 * @param v The value to check
 */
export const isNotUndefined = makeIsNot(isUndefined)

/**
 * Alias of {@link isNotUndefined}.
 *
 * Returns false if a value is `undefined`.
 *
 * This function is a type guard, guaranteeing the value is **not** `undefined`.
 *
 * Refer to {@link isNotNil} if you want to check for `undefined` AND `null`
 *
 * @param v The value to check
 */
export const isDefined = isNotUndefined

/**
 * Returns false if a value is `null`.
 *
 * This function is a type guard, guaranteeing the value is **not** `null`.
 *
 * Refer to {@link isNotNil} if you want to check for `undefined` AND `null`.
 *
 * @param v The value to check
 */
export const isNotNull = makeIsNot(isNull)

/**
 * Returns false if a value is `null` or `undefined`.
 *
 * This function is a type guard, guaranteeing the value is **neither** `null` **nor** `undefined`.
 *
 * @param v The value to check
 */
export const isNotNil = makeIsNot(isNil)

/**
 * Returns false if a value is classified as an Array object.
 *
 * This function is a type guard, guaranteeing the value is **not** an Array.
 *
 * @param v The value to check
 */
export const isNotArray = makeIsNot(isArray)

/**
 * Returns false if a value is an empty object, collection, map, or set.
 *
 * This function is the negation of isEmpty from lodash.
 * Refer to {@link https://lodash.com/docs/4.17.15#isEmpty their docs}
 * for more details about the definition of "empty".
 *
 * @param v The value to check
 */
export const isNotEmpty = makeIsNot(isEmpty)

/**
 * Returns true if a value is an empty string after trimming.
 *
 * @param v The value to check
 */
export const isEmptyAfterTrim = (v: string): boolean => isEmpty(v.trim())

/**
 * Returns false if a value is an empty string after trimming.
 *
 * This function is the negation of isEmptyAfterTrim.
 *
 * @param v The value to check
 */
export const isNotEmptyAfterTrim = makeIsNot(isEmptyAfterTrim)

/**
 * Returns false if a value is not deeply equal to another value.
 *
 * This function is the negation of isEqual from lodash.
 * Refer to {@link https://lodash.com/docs/4.17.15#isEqual their docs}
 * for more details about deep comparison.
 *
 * @param value The value to compare
 * @param other The other value to compare
 */
export const isNotDeepEqual = makeIsNot(isDeepEqual)

/**
 * Returns false if a value is not a function
 *
 * This function is a type guard, guaranteeing the value is **not** a function.
 *
 * @param v The value to check
 */
export const isNotFunction = makeIsNot(isFunction)
