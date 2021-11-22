/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

import { PredicateFunction, UnpackPredicateFunction } from '~/predicates/predicate-fn'
import { AssertionFunction, UnpackAssertionFunction } from './assertion-function'

export const fromPredicateFunction =
  <F extends PredicateFunction>(predicate: F): AssertionFunction<UnpackPredicateFunction<F>> =>
  (v): asserts v is UnpackAssertionFunction<F> => {
    if (predicate(v) === false) {
      throw Error(`Invalid value`)
    }
  }
