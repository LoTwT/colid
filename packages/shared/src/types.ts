import type { Accessor, Signal } from 'solid-js'

export type MayBeAccessor<T> = T | Accessor<T>

export type MayBeSignal<T> = T | Signal<T>
