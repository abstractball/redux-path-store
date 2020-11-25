import { useSelector } from 'react-redux'
import * as immutable from 'object-path-immutable'
import { PathStoreMap, UseReduxStateOptions } from '../types'

export function useReduxGet<T>(pathMap?: PathStoreMap<T>, { find, optional }: UseReduxStateOptions<T> = {}): T {
  return useSelector((store: any) => {
    if (!pathMap) {
      if (!optional) {
        throw new Error('Missing pathmap.')
      }

      return undefined
    }

    let value = immutable.get(store, pathMap.path)

    if (find) value = find(value)

    return value
  })
}
