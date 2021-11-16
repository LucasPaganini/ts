/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { PickPropertyByType } from './pick-property-by-type'

describe('PickPropertyByType', () => {
  it('should return the keys of the properties that match the expected type', () => {
    type A = { a: string; b: number; c: Date; d: Date }

    expectTypeOf<PickPropertyByType<A, string>>().toEqualTypeOf<'a'>()
    expectTypeOf<PickPropertyByType<A, number>>().toEqualTypeOf<'b'>()
    expectTypeOf<PickPropertyByType<A, Date>>().toEqualTypeOf<'c' | 'd'>()
  })
})
