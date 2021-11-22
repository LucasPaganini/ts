/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { Mutable } from './mutable'

describe('Mutable', () => {
  it('should convert a readonly type a mutable one', () => {
    expectTypeOf<Mutable<ReadonlyArray<number>>>().toEqualTypeOf<Array<number>>()
    expectTypeOf<Mutable<{ readonly a: string }>>().toEqualTypeOf<{ a: string }>()
  })
})
