/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { ObjectValues } from './object-values'

/**
 * @example
 * ```ts
 * type A = { a: string; b: number; c: Date; d: Date }
 * PickPropertyByType<A, string> //=> "a"
 * PickPropertyByType<A, number> //=> "b"
 * PickPropertyByType<A, Date> //=> "c" | "d"
 * ```
 */
export type PickPropertyByType<O, T> = ObjectValues<{ [P in keyof O]: O[P] extends T ? P : never }>
