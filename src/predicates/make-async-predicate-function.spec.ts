/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { isEmpty, isEqual as isDeepEqual, isNumber, isString } from 'lodash'
import { makeAsyncPredicateFunction } from './make-async-predicate-function'
import { PredicateFunction, UnguardedPredicateFunction } from './predicate-fn'

describe(makeAsyncPredicateFunction.name, () => {
  it('throws if the generated function is called with different arguments', async () => {
    const _isNumberAsync = (value: unknown) => Promise.resolve(isNumber(value))
    const isNumberAsync = makeAsyncPredicateFunction<number>(_isNumberAsync)

    const foo = 1
    const bar = 2

    const fooIsNumber = await isNumberAsync(foo)
    expect(() => fooIsNumber(foo)).not.toThrow()
    expect(() => fooIsNumber(bar)).toThrow()
  })

  it('correctly calls the AsyncUnguardedPredicateFunction to make the check', async () => {
    const asyncFnSpy = jasmine.createSpy('_isNumberAsync')
    const isNumberAsync = makeAsyncPredicateFunction<number>(asyncFnSpy)

    asyncFnSpy.and.resolveTo(true)
    const isNumber_true = await isNumberAsync(1)
    expect(isNumber_true(1)).toBeTrue()

    asyncFnSpy.and.resolveTo(false)
    const isNumber_false = await isNumberAsync(1)
    expect(isNumber_false(1)).toBeFalse()
  })

  it('has the correct types', async () => {
    const _isStringAsync = (value: unknown) => Promise.resolve(isString(value))
    const isStringAsync = makeAsyncPredicateFunction<string>(_isStringAsync)
    expectTypeOf(isStringAsync).toBeCallableWith(1)
    expectTypeOf(isStringAsync).returns.toEqualTypeOf<Promise<PredicateFunction<string>>>()
    expectTypeOf(isStringAsync).parameters.toEqualTypeOf<[unknown]>()
    const aaa = 1 as number | string | Date
    const aaaIsString = await isStringAsync(aaa)
    expectTypeOf(aaaIsString).toBeCallableWith(5)
    expectTypeOf(aaaIsString).returns.toEqualTypeOf<boolean>()
    expectTypeOf(aaaIsString).parameters.toEqualTypeOf<[unknown]>()
    if (aaaIsString(aaa)) {
      expectTypeOf(aaa).toEqualTypeOf<string>()
    } else {
      expectTypeOf(aaa).toEqualTypeOf<number | Date>()
    }

    const _isNumberAsync = (value: unknown) => Promise.resolve(isNumber(value))
    const isNumberAsync = makeAsyncPredicateFunction<number>(_isNumberAsync)
    expectTypeOf(isNumberAsync).toBeCallableWith(1)
    expectTypeOf(isNumberAsync).returns.toEqualTypeOf<Promise<PredicateFunction<number>>>()
    expectTypeOf(isNumberAsync).parameters.toEqualTypeOf<[unknown]>()
    const bbb = 1 as number | string | Date
    const bbbIsNumber = await isNumberAsync(bbb)
    expectTypeOf(bbbIsNumber).toBeCallableWith(5)
    expectTypeOf(bbbIsNumber).returns.toEqualTypeOf<boolean>()
    expectTypeOf(bbbIsNumber).parameters.toEqualTypeOf<[unknown]>()
    if (bbbIsNumber(bbb)) {
      expectTypeOf(bbb).toEqualTypeOf<number>()
    } else {
      expectTypeOf(bbb).toEqualTypeOf<string | Date>()
    }

    const _isEmptyAsync = (value: unknown) => Promise.resolve(isEmpty(value))
    const isEmptyAsync = makeAsyncPredicateFunction(_isEmptyAsync)
    expectTypeOf(isEmptyAsync).toBeCallableWith(1)
    expectTypeOf(isEmptyAsync).returns.toEqualTypeOf<Promise<UnguardedPredicateFunction<[unknown]>>>()
    expectTypeOf(isEmptyAsync).parameters.toEqualTypeOf<[unknown]>()
    const ccc = 1 as number | string | Date
    const cccIsEmpty = await isEmptyAsync(ccc)
    expectTypeOf(cccIsEmpty).toBeCallableWith(5)
    expectTypeOf(cccIsEmpty).returns.toEqualTypeOf<boolean>()
    expectTypeOf(cccIsEmpty).parameters.toEqualTypeOf<[unknown]>()
    if (cccIsEmpty(ccc)) {
      expectTypeOf(ccc).toEqualTypeOf<number | string | Date>()
    } else {
      expectTypeOf(ccc).toEqualTypeOf<number | string | Date>()
    }

    const _isDeepEqualAsync = (a: unknown, b: unknown) => Promise.resolve(isDeepEqual(a, b))
    const isDeepEqualAsync = makeAsyncPredicateFunction(_isDeepEqualAsync)
    expectTypeOf(isDeepEqualAsync).toBeCallableWith(1, 2)
    expectTypeOf(isDeepEqualAsync).returns.toEqualTypeOf<Promise<UnguardedPredicateFunction<[unknown, unknown]>>>()
    expectTypeOf(isDeepEqualAsync).parameters.toEqualTypeOf<[unknown, unknown]>()
  })
})
