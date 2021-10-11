export type AssertionFunction<T = any> = (v: unknown) => asserts v is T

export type UnpackedAssertionFunction<F extends AssertionFunction> = F extends AssertionFunction<infer T> ? T : never
