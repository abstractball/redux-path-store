import { PathStoreMap, UseReduxState, UseReduxStateOptions } from '../types'
import { useReduxSet } from './useReduxSet'
import { useReduxGet } from './useReduxGet'
import { useReduxReset } from './useReduxReset'

export function useReduxState<T>(pathMap?: PathStoreMap<T>, options?: UseReduxStateOptions<T>): UseReduxState<T> {
  const value = useReduxGet(pathMap, options)
  const setValue = useReduxSet(pathMap, options)
  const resetValue = useReduxReset(pathMap, options)

  return [value, setValue, resetValue]
}
