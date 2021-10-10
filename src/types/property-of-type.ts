/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { ObjectValues } from './object-values'

export type PropertyOfType<O, T> = ObjectValues<{ [P in keyof O]: O[P] extends T ? P : never }>
