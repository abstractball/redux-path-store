import { useSelector } from 'react-redux'
import * as immutable from 'object-path-immutable'
import { PathStoreMap, UseReduxStateOptions } from '../types'

export function useReduxGet<T>(pathMap: PathStoreMap<T>, { find, localState }: UseReduxStateOptions<T> = {}): T {
  if (localState) return localState[0]

  return useSelector((store: any) => {
    let value = immutable.get(store, pathMap.path)

    if (find) value = find(value)

    return value
  })
}
