/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { makeIsInstance } from './make-is-instance'
import { makeIsNot } from './make-is-not'

describe(makeIsNot.name, () => {
  it('returns an inversed predicate function', () => {
    const isNumber = (v: any): v is number => typeof v === 'number'
    const isNotNumber = makeIsNot(isNumber)
    expect(isNotNumber('123')).toBe(true)
    expect(isNotNumber(123)).toBe(false)

    const isArray = makeIsInstance(Array)
    const isNotArray = makeIsNot(isArray)
    expect(isNotArray('abc')).toBe(true)
    expect(isNotArray([])).toBe(false)
  })

  it('returns an inversed unguarded predicate function', () => {
    const isEqual = (a: number, b: number): boolean => a === b
    const isNotEqual = makeIsNot(isEqual)
    expect(isNotEqual(1, 2)).toBe(true)
    expect(isNotEqual(1, 1)).toBe(false)
  })

  it('has the correct types', () => {
    const isEqual = (a: number, b: number): boolean => a === b
    const isNumber = (v: any): v is number => typeof v === 'number'
    const is1 = (v: number): v is 1 => v === 1
    expectTypeOf(makeIsNot).toBeCallableWith(isEqual)
    expectTypeOf(makeIsNot).toBeCallableWith(isNumber)
    expectTypeOf(makeIsNot).toBeCallableWith(is1)

    const isNotEqual = makeIsNot(isEqual)
    expectTypeOf(isNotEqual).toBeCallableWith(1, 1)
    expectTypeOf(isNotEqual).returns.toEqualTypeOf<boolean>()
    expectTypeOf(isNotEqual).parameters.toEqualTypeOf<[number, number]>()

    const isNotNumber = makeIsNot(isNumber)
    expectTypeOf(isNotNumber).toBeCallableWith(1)
    expectTypeOf(isNotNumber).toBeCallableWith('a')
    expectTypeOf(isNotNumber).returns.toEqualTypeOf<boolean>()
    expectTypeOf(isNotNumber).parameters.toEqualTypeOf<[any]>()

    const isNot1 = makeIsNot(is1)
    expectTypeOf(isNot1).toBeCallableWith(5)
    expectTypeOf(isNot1).parameter(0).not.toMatchTypeOf('asdf')
    expectTypeOf(isNot1).returns.toEqualTypeOf<boolean>()

    const aaa = 1 as number | string | Date
    if (isNotNumber(aaa)) {
      expectTypeOf(aaa).toEqualTypeOf<string | Date>()
    } else {
      expectTypeOf(aaa).toEqualTypeOf<number>()
    }
  })
})
