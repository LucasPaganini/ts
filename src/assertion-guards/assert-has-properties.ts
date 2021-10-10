/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { isNull } from 'lodash-es'

/**
 * Asserts that the given value has the given properties. Throws if it doesn't.
 *
 * This function is an assertion guard, guaranteeing that the given value has
 * the given properties for all the code that comes after this call.
 *
 * @throws {@link Error}
 * This exception is thrown if the given value doesn't have some of the given properties.
 *
 * @example
 * ```ts
 * let foo: unknown = someUnknownObject;
 *
 * // Usage
 * foo.a // <- Compilation error
 *
 * assertHasProperties(['a'], foo)
 * foo.a // <- foo: { a: unknown }
 * ```
 *
 * @param properties The properties that we'll check if the given value has
 * @param value The value to assert
 */
type AssertHasProperties = <Property extends string>(
  properties: ReadonlyArray<Property>,
  value: unknown,
) => asserts value is Record<Property, unknown>

/**
 * Asserts that the given value has the given properties. Throws if it doesn't.
 *
 * This function is an assertion guard, guaranteeing that the given value has
 * the given properties for all the code that comes after this call.
 *
 * @throws {@link Error}
 * This exception is thrown if the given value doesn't have some of the given properties.
 *
 * @example
 * ```ts
 * let foo: unknown = someUnknownObject;
 *
 * // Usage
 * foo.a // <- Compilation error
 *
 * assertHasProperties(['a'], foo)
 * foo.a // <- foo: { a: unknown }
 * ```
 *
 * @param properties The properties that we'll check if the given value has
 * @param value The value to assert
 */
export const assertHasProperties: AssertHasProperties = (properties, value) => {
  // Only objects have properties
  if (typeof value !== 'object') {
    throw Error(`Value is not an object`)
  }

  // Make sure it's not null
  if (isNull(value)) {
    throw Error('Value is null')
  }

  // Check if it has the expected properties
  for (const prop of properties) {
    if (prop in value === false) {
      throw Error(`Value doesn't have .${prop}`)
    }
  }
}
