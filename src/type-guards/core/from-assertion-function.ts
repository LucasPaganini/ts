/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { AssertionFunction, UnpackedAssertionFunction } from '~/assertion-guards'
import { PredicateFunction } from './predicate-fn'

export const fromAssertionFunction =
  <F extends AssertionFunction>(assert: F): PredicateFunction<UnpackedAssertionFunction<F>> =>
  (v): v is UnpackedAssertionFunction<F> => {
    try {
      assert(v)
      return true
    } catch {
      return false
    }
  }
