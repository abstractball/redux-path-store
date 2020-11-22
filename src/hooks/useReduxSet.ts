import { useCallback } from 'react'
import { setReduxState } from '..'
import { PathStoreMap, UseReduxStateOptions } from '../types'

export function useReduxSet<T>(pathMap: PathStoreMap<T>, { find, localState }: UseReduxStateOptions<T> = {}) {
  return useCallback((action) => {
    if (localState) return localState[1](action) as any

    return setReduxState(pathMap, (prevValue) => {
      // @ts-ignore
      let newValue = typeof action === 'function' ? action(prevValue) : action

      if (find) newValue = find(newValue)

      return newValue
    })
  }, [pathMap])
}
