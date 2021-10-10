/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE.md file for details.
 **************************************************************************/

/**
 * A predicate function that takes a single value and serves as a type guard for a given type T
 */
export type PredicateFn<T = any> = (v: unknown) => v is T

/**
 * An async predicate function that takes a single value and returns a {@link PredicateFn} wrapped
 * in a {@link Promise} that serves as a type guard for a given type T
 */
export type AsyncPredicateFn<T = any> = (value: unknown) => Promise<PredicateFn<T>>

/**
 * A predicate function that accepts any number of parameters
 */
export type UnguardedPredicateFn<Params extends Array<any> = Array<any>> = (...args: Params) => boolean

/**
 * An async predicate function that accepts any number of parameters
 */
export type AsyncUnguardedPredicateFn<Params extends Array<any> = Array<any>> = (...args: Params) => Promise<boolean>

/**
 *  Unpacks the type T from a {@link PredicateFn}
 */
export type UnpackedPredicateFn<F extends PredicateFn> = F extends PredicateFn<infer T> ? T : never
