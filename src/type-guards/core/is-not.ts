/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { PredicateFn, UnguardedPredicateFn, UnpackedPredicateFn } from './predicate-fn'

/**
 * @privateRemarks
 *
 * This type enables {@link makeIsNot}, which is defined below.
 */
type MakeIsNot = {
  /**
   * Creates an inversed `PredicateFn` from an existing `PredicateFn`.
   *
   * @example
   * ```ts
   * const isNumber = (v: any): v is number => typeof v === 'number';
   *
   * // The following expressions are equivalent:
   * const isNotNumber = makeIsNot(isNumber);
   * const isNotNumber = <V>(v: V): v is Exclude<V, number> => isNumber(v) === false;
   * ```
   *
   * @param fn Predicate function to inverse
   */
  <F extends PredicateFn>(fn: F): <V extends Parameters<F>[0] = Parameters<F>[0]>(
    v: V,
  ) => v is Exclude<V, UnpackedPredicateFn<F>>

  /**
   * Creates an inversed `UnguardedPredicateFn` from an existing
   * `UnguardedPredicateFn`.
   *
   * @example
   * ```ts
   * const isEqual = (a: number, b: number): boolean => a === b;
   *
   * // The following expressions are equivalent:
   * const isNotEqual = makeIsNot(isEqual);
   * const isNotEqual = (a: number, b: number): boolean => isEqual(a, b) === false;
   * ```
   *
   * @param fn Unguarded predicate function to inverse
   */
  <F extends UnguardedPredicateFn>(fn: F): (
    ...args: Parameters<F>
  ) => ReturnType<F> extends true ? false : ReturnType<F> extends false ? true : boolean
}

/**
 * @privateRemarks
 *
 * Creates a predicate function by negating the return value of a provided predicate function.
 *
 * If the provided function is a type guard, the returned function will be a type guard,
 * guaranteeing the inverse.
 *
 * @param fn A predicate function (guarded or not) to negate
 */
export const makeIsNot: MakeIsNot = (fn: (...args: Array<any>) => any) => ((...args: Array<any>) => !fn(...args)) as any
