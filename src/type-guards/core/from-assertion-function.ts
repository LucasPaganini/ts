import { AssertionFunction, UnpackedAssertionFunction } from '~/assertion-guards'
import { PredicateFn } from './predicate-fn'

export const fromAssertionFunction =
  <F extends AssertionFunction>(assert: F): PredicateFn<UnpackedAssertionFunction<F>> =>
  (v): v is UnpackedAssertionFunction<F> => {
    try {
      assert(v)
      return true
    } catch {
      return false
    }
  }
