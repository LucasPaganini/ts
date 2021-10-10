/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { makeIsIncluded } from './make-is-included'

describe(makeIsIncluded.name, () => {
  it('returns a predicate function that checks if value is included in the iterable', () => {
    const abc = ['a', 'b', 'c']
    const iterables = [[...abc], new Set(abc), abc.join('')]

    const truths = abc
    const lies = [undefined, null, 1, 2, 3, 0, 'd', 'e', 'f', 'abc', 'ab', 'bc', 'ac']

    for (const iterable of iterables) {
      const isInABC = makeIsIncluded(iterable)
      expect(truths.every(v => isInABC(v) === true)).toBe(true)
      expect(lies.every(v => isInABC(v) === false)).toBe(true)
    }
  })

  it('has the correct types', () => {
    const abc = ['a', 'b', 'c'] as const
    const isInABC = makeIsIncluded(abc)

    expectTypeOf(makeIsIncluded).toEqualTypeOf<<T>(iterable: Iterable<T>) => (v: unknown) => v is T>()
    expectTypeOf(isInABC).toEqualTypeOf<(v: unknown) => v is 'a' | 'b' | 'c'>()
  })
})
