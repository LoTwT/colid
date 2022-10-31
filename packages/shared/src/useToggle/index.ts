import type { Signal } from 'solid-js'
import { createSignal } from 'solid-js'
import type { MayBeSignal } from '../types'
import { isSignal, unSignal } from '../utils'

interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: MayBeSignal<Truthy>
  falsyValue?: MayBeSignal<Falsy>
}

export function useToggle<Truthy, Falsy, T = Truthy | Falsy>(
  initialValue?: Signal<T>,
  options?: UseToggleOptions<Truthy, Falsy>
): (value?: T) => T
export function useToggle<Truthy = true, Falsy = false, T = Truthy | Falsy>(
  initialValue?: T,
  options?: UseToggleOptions<Truthy, Falsy>
): { value: Signal<T>['0']; toggle: (value?: T) => T }

export function useToggle(
  initialValue: MayBeSignal<boolean> = false,
  options: UseToggleOptions<true, false> = {},
) {
  const { truthyValue = true, falsyValue = false } = options
  const valueIsSignal = isSignal(initialValue)

  const [internalValue, setInternalValue] = createSignal(
    unSignal(initialValue),
  )

  const realSet = (value: boolean) => {
    setInternalValue(value)
    valueIsSignal && (initialValue as Signal<boolean>)[1](value)
  }

  function toggle(value?: boolean) {
    // has arguments
    if (arguments.length) {
      realSet(value!)
    }
    else {
      const truthy = unSignal(truthyValue)
      realSet(
        (internalValue() === truthy ? unSignal(falsyValue) : truthyValue) as any,
      )
    }

    return internalValue()
  }

  return valueIsSignal ? toggle : { value: internalValue, toggle }
}
