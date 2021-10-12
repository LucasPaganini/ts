/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { assertHasProperties } from '~/assertion-guards/assert-has-properties'
import { PredicateFunction } from './predicate-fn'

/**
 * Creates a {@link PredicateFunction} that checks if the given value has the given
 * properties.
 *
 * @example
 * ```ts
 * let foo: unknown = someUnknownObject;
 *
 * // The following expressions are equivalent:
 * const hasPropA = makeHasProperties(['a']);
 * const hasPropA = (v: unknown): v is Record<'a', unknown> =>
 * 	 typeof v === 'object' &&
 * 	 v !== null &&
 * 	 'a' in v;
 *
 * // Usage
 * foo.a // <- Compilation error
 * if (hasPropA(foo)) {
 *   foo.a // <- foo: { a: unknown }
 * }
 * ```
 *
 * @param properties The properties that we'll check if the given value has
 */
export const makeHasProperties = <Property extends string>(
  properties: ReadonlyArray<Property>,
): PredicateFunction<Record<Property, unknown>> => {
  return (value: unknown): value is Record<Property, unknown> => {
    try {
      assertHasProperties(properties, value)
      return true
    } catch {
      return false
    }
  }
}
