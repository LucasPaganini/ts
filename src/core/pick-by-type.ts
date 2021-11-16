/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { PickPropertyByType } from './pick-property-by-type'

/**
 * @example
 * ```ts
 * type A = { a: string; b: number; c: Date; d: Date }
 * PickByType<A, string> //=> { a: string }
 * PickByType<A, number> //=> { b: number }
 * PickByType<A, Date> //=> { c: Date; d: Date }
 * ```
 */
export type PickByType<O, T> = Pick<O, PickPropertyByType<O, T>>
