/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { PickByType } from './pick-by-type'

describe('PickByType', () => {
  it('should return an object that only constains the properties with the expected type', () => {
    type A = { a: string; b: number; c: Date; d: Date }

    expectTypeOf<PickByType<A, string>>().toEqualTypeOf<{ a: string }>()
    expectTypeOf<PickByType<A, number>>().toEqualTypeOf<{ b: number }>()
    expectTypeOf<PickByType<A, Date>>().toEqualTypeOf<{ c: Date; d: Date }>()
  })
})
