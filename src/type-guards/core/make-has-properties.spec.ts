/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { makeHasProperties } from './make-has-properties'

describe(makeHasProperties.name, () => {
  it('returns a predicate function that checks if value has the given properties', () => {
    // Single property
    const has_A = makeHasProperties(['a'])
    expect(has_A({ a: 1, b: 2 })).toBe(true)
    expect(has_A({ a: 1 })).toBe(true)
    expect(has_A({})).toBe(false)
    expect(has_A({ b: 2 })).toBe(false)

    // Multiple properties
    const has_A_B = makeHasProperties(['a', 'b'])
    expect(has_A_B({ a: 1, b: 2 })).toBe(true)
    expect(has_A_B({ a: 1 })).toBe(false)

    // Multiple properties w/ non-literal array argument
    const props = ['a', 'b']
    const has_A_B_arr = makeHasProperties(props)
    expect(has_A_B_arr({ a: 1, b: 2 })).toBe(true)
    expect(has_A_B_arr({ a: 1 })).toBe(false)

    // Multiple properties w/ const array
    const roProps = ['a', 'b'] as const
    const has_A_B_ro_arr = makeHasProperties(roProps)
    expect(has_A_B_ro_arr({ a: 1, b: 2 })).toBe(true)
    expect(has_A_B_ro_arr({ a: 1 })).toBe(false)
  })

  it('has the correct types', () => {
    const hasPropX = makeHasProperties(['x'])

    expectTypeOf(makeHasProperties).toEqualTypeOf<
      <Property extends string>(properties: ReadonlyArray<Property>) => (v: unknown) => v is Record<Property, unknown>
    >()
    expectTypeOf(hasPropX).toEqualTypeOf<(v: unknown) => v is Record<'x', unknown>>()
  })
})
