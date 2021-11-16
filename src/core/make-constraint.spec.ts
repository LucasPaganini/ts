/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type'
import { makeConstraint } from './make-constraint'

describe(makeConstraint.name, () => {
  it('should keep the const types of a constrained value', () => {
    type Icon = { id: string; name: string }
    const iconConstraint = makeConstraint<Icon>()
    const iconsConstraint = makeConstraint<ReadonlyArray<Icon>>()

    const icon = iconConstraint({ id: 'a', name: 'some-name' } as const)
    expectTypeOf<typeof icon['id']>().toEqualTypeOf<'a'>()

    const icons = iconsConstraint([
      { id: 'b', name: 'some-name' },
      { id: 'c', name: 'some-name' },
    ] as const)
    expectTypeOf<typeof icons[number]['id']>().toEqualTypeOf<'b' | 'c'>()
  })

  it('should constrain the value', () => {
    type Icon = { id: string; name: string }
    const iconConstraint = makeConstraint<Icon>()

    expectTypeOf<typeof iconConstraint>().parameter(0).toEqualTypeOf<Icon>()
  })
})
