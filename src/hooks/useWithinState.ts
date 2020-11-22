import { FindWithinState, UseReduxState, UseWithinState } from '../types'

export function useWithinState<T>([value, setValue, resetValue]: UseReduxState<T>, find: FindWithinState<T>): UseWithinState<T> {
  if (!Array.isArray(value)) throw new Error('useWithinState can only be used with arrays.')

  const withinValue = find(value)

  const setWithinValue = (action: any) => setValue((prevRows) => {
    const prevRow = find(prevRows)

    if (!prevRow) throw new Error('Could not find anything with the find function.')

    // @ts-ignore
    const newRow = typeof action === 'function' ? action(prevRow) : action

    return (prevRows as any).map((row: any) => (row === prevRow ? newRow : row))
  })

  return [withinValue, setWithinValue, resetValue]
}
