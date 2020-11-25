import { SetStateAction } from 'react'
import { FindWithinState, UseContextState, UseWithinState } from '../types'

export function useWithinState<T, U>([value, setValue, resetValue]: UseContextState<T>, find: FindWithinState<T, U>): UseWithinState<T, U> {
  if (!Array.isArray(value)) throw new Error('useWithinState can only be used with arrays.')

  const withinValue = find(value)

  const setWithinValue = (action: SetStateAction<U>) => setValue((prevRows) => {
    const prevRow = find(prevRows)

    if (!prevRow) throw new Error('Could not find anything with the find function.')

    // @ts-ignore
    const newRow = typeof action === 'function' ? action(prevRow) : action

    return (prevRows as any).map((row: any) => (row === prevRow ? newRow : row)) as T
  })

  return [withinValue, setWithinValue, resetValue as any]
}
