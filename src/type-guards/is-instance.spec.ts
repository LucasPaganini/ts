/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { makeIsInstance } from './is-instance'

describe(makeIsInstance.name, () => {
  it('returns a predicate function that checks if value is an instance of the given class', () => {
    const isDate = makeIsInstance(Date)
    expect(isDate(new Date())).toBe(true)
    expect(isDate(123)).toBe(false)

    const isArray = makeIsInstance(Array)
    expect(isArray([])).toBe(true)
    expect(isArray('abc')).toBe(false)

    class Test {}
    const isTest = makeIsInstance(Test)
    expect(isTest(new Test())).toBe(true)
    expect(isTest({})).toBe(false)
  })

  it('has the correct types', () => {
    const isDate = makeIsInstance(Date)

    expectTypeOf(makeIsInstance).toEqualTypeOf<<C>(c: C) => (v: unknown) => v is C>()
    expectTypeOf(isDate).toEqualTypeOf<(v: unknown) => v is Date>()
  })
})
