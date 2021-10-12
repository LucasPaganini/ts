/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { AsyncPredicateFunction, AsyncUnguardedPredicateFunction, UnguardedPredicateFunction } from './predicate-fn'

/**
 * @privateRemarks
 *
 * This type enables {@link makeAsyncPredicateFunction}, which is defined below.
 */
type MakeAsyncPredicateFunction = {
  /**
   * Creates a {@link UnguardedPredicateFunction} from an existing {@link AsyncUnguardedPredicateFunction}.
   *
   * @param fn Async unguarded predicate function
   */
  <F extends AsyncUnguardedPredicateFunction>(fn: F): (
    ...args: Parameters<F>
  ) => Promise<UnguardedPredicateFunction<Parameters<F>>>

  /**
   * Creates a {@link PredicateFunction} from an existing {@link AsyncUnguardedPredicateFunction}.
   *
   * @param fn Async unguarded predicate function
   */
  <T>(fn: AsyncUnguardedPredicateFunction): AsyncPredicateFunction<T>
}

/**
 * @privateRemarks
 *
 * Creates the promise of a predicate function from an existing async unguarded predicate function.
 *
 * @param fn Async predicate function (guarded or not)
 */
export const makeAsyncPredicateFunction: MakeAsyncPredicateFunction =
  (fn: AsyncUnguardedPredicateFunction) =>
  (...args: Array<any>) =>
    fn(...args).then(
      r =>
        ((..._args: Array<any>) => {
          if (arraysAreDifferent(args, _args)) throw differentValueError()
          return r
        }) as any,
    )

const differentValueError = () =>
  Error(`The arguments given to the async generated function are different than the ones given to the initial function`)

const arraysAreDifferent = <T>(arrayA: Array<T>, arrayB: Array<T>): boolean => {
  // If the array lengths are different, the arrays are certainly different
  if (arrayA.length !== arrayB.length) return true
  const arrayLength = arrayA.length

  // If their lengths are the same, we need to compare the values
  const zippedArray = Array.from({ length: arrayLength }).map((_, i) => [arrayA[i], arrayB[i]])
  return zippedArray.some(([a, b]) => a !== b)
}
