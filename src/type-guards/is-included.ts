/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { PredicateFn } from './predicate-fn'

/**
 * Creates a `PredicateFn` that checks if a value is included in the given
 * iterable.
 *
 * @example
 * ```ts
 * // The following expressions are equivalent:
 * const abc = ['a', 'b', 'c'];
 * const isInABC = makeIsIncluded(abc);
 * const isInABC = (v: any): v is 'a' | 'b' | 'c' => abc.includes(v);
 * ```
 *
 * @param iterable Iterable to check if value is included in
 */
export const makeIsIncluded = <T>(iterable: Iterable<T>): PredicateFn<T> => {
  /**
   * We create a new Set, even if the iterable itself is already a Set because
   * the user could mutate it and break the check. For example:
   * ```ts
   * const mutableSet = new Set(['a', 'b', 'c']);
   * const isInABC = makeIsIncluded(mutableSet);
   * isInABC('a'); // true <- OK
   * mutableSet.delete('a');
   * isInABC('a'); // false <- BUG
   * ```
   */
  const set = new Set(iterable)
  return (v: any): v is T => set.has(v)
}
