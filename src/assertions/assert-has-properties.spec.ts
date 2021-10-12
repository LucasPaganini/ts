/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { assertHasProperties } from './assert-has-properties'

describe(assertHasProperties.name, () => {
  it('returns if value has the given properties and throws otherwise', () => {
    // Single property
    expect(() => assertHasProperties(['a'], { a: 1, b: 2 })).not.toThrow()
    expect(() => assertHasProperties(['a'], { a: 1 })).not.toThrow()
    expect(() => assertHasProperties(['a'], {})).toThrow()
    expect(() => assertHasProperties(['a'], { b: 2 })).toThrow()

    // Multiple properties
    expect(() => assertHasProperties(['a', 'b'], { a: 1, b: 2 })).not.toThrow()
    expect(() => assertHasProperties(['a', 'b'], { a: 1 })).toThrow()

    // Multiple properties w/ non-literal array argument
    const props = ['a', 'b']
    expect(() => assertHasProperties(props, { a: 1, b: 2 })).not.toThrow()
    expect(() => assertHasProperties(props, { a: 1 })).toThrow()

    // Multiple properties w/ const array argument
    const roProps = ['a', 'b'] as const
    expect(() => assertHasProperties(roProps, { a: 1, b: 2 })).not.toThrow()
    expect(() => assertHasProperties(roProps, { a: 1 })).toThrow()
  })

  it('has the correct types', () => {
    expectTypeOf(assertHasProperties).toEqualTypeOf<
      <Property extends string>(
        properties: ReadonlyArray<Property>,
        value: unknown,
      ) => asserts value is Record<Property, unknown>
    >()
  })
})
