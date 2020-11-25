import { useCallback } from 'react'
import { setReduxState } from '..'
import { PathStoreMap, UseReduxStateOptions } from '../types'

export function useReduxSet<T>(pathMap?: PathStoreMap<T>, { find, optional }: UseReduxStateOptions<T> = {}) {
  return useCallback((action) => {
    if (!pathMap && !optional) {
      throw new Error('Missing path map')
    }

    return setReduxState(pathMap!, (prevValue) => {
      // @ts-ignore
      let newValue = typeof action === 'function' ? action(prevValue) : action

      if (find) newValue = find(newValue)

      return newValue
    })
  }, [pathMap])
}
