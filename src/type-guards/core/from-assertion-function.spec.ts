import { expectTypeOf } from 'expect-type'
import { fromAssertionFunction } from './from-assertion-function'

describe(fromAssertionFunction.name, () => {
  it('takes an AssertionFunction and returns a PredicateFunction', () => {
    type Assert1 = (v: unknown) => asserts v is 1
    const assert1: Assert1 = (v: unknown): asserts v is 1 => {
      if (v !== 1) throw Error('')
    }

    const is1 = fromAssertionFunction(assert1)

    expect(() => assert1(1)).not.toThrow()
    expect(is1(1)).toBeTrue()

    expect(() => assert1(2)).toThrow()
    expect(is1(2)).toBeFalse()
  })

  it('has the correct types', () => {
    type Assert1 = (v: unknown) => asserts v is 1
    const assert1: Assert1 = (v: unknown): asserts v is 1 => {
      if (v !== 1) throw Error('')
    }
    expectTypeOf(assert1).toEqualTypeOf<(v: unknown) => asserts v is 1>()
    expectTypeOf(fromAssertionFunction).toBeCallableWith(assert1)

    const is1 = fromAssertionFunction(assert1)
    expectTypeOf(is1).toEqualTypeOf<(v: unknown) => v is 1>()

    const aaa = 1 as 1 | 2 | 3
    if (is1(aaa)) {
      expectTypeOf(aaa).toEqualTypeOf<1>()
    } else {
      expectTypeOf(aaa).toEqualTypeOf<2 | 3>()
    }

    expectTypeOf(aaa).toEqualTypeOf<1 | 2 | 3>()
    assert1(aaa)
    expectTypeOf(aaa).toEqualTypeOf<1>()
  })
})
