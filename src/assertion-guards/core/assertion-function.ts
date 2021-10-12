/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

export type AssertionFunction<T = any> = {
  (a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, ...args: Array<any>): asserts j is T
  (a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, ...args: Array<any>): asserts i is T
  (a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, ...args: Array<any>): asserts h is T
  (a: any, b: any, c: any, d: any, e: any, f: any, g: any, ...args: Array<any>): asserts g is T
  (a: any, b: any, c: any, d: any, e: any, f: any, ...args: Array<any>): asserts f is T
  (a: any, b: any, c: any, d: any, e: any, ...args: Array<any>): asserts e is T
  (a: any, b: any, c: any, d: any, ...args: Array<any>): asserts d is T
  (a: any, b: any, c: any, ...args: Array<any>): asserts c is T
  (a: any, b: any, ...args: Array<any>): asserts b is T
  (a: any, ...args: Array<any>): asserts a is T
}

export type UnpackAssertionFunction<F extends AssertionFunction> = F extends AssertionFunction<infer T> ? T : never
