/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { PredicateFn } from './predicate-fn'

/**
 * Creates a `PredicateFn` that checks if a value is `instanceof` the given
 * class constructor.
 *
 * @example
 * ```ts
 * // The following expressions are equivalent:
 * const isDate = makeIsInstance(Date);
 * const isDate = (v: any): v is Date => v instanceof Date;
 * ```
 *
 * @param classConstructor Class constructor to check if value is `instanceof`
 */
export const makeIsInstance =
  <C extends new (...args: any) => any>(classConstructor: C): PredicateFn<InstanceType<C>> =>
  (v: any): v is InstanceType<C> =>
    v instanceof classConstructor
