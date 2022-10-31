import type { Signal } from 'solid-js'
import type { MayBeSignal } from '../types'

export const isSignal = <T>(value: MayBeSignal<T>) => Array.isArray(value)

export const unSignal = <T>(signal: MayBeSignal<T>) =>
  (isSignal(signal) ? (signal as Signal<T>)[0]() : signal) as T
