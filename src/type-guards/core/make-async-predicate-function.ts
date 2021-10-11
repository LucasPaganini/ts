/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { zip } from 'lodash'
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
          if (args.length !== _args.length || zip(args, _args).some(([a, b]) => a !== b)) throw differentValueError()
          return r
        }) as any,
    )

const differentValueError = () =>
  Error(`The arguments given to the async generated function are different than the ones given to the initial function`)
