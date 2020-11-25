import { useCallback } from 'react'
import { PathStoreMap, UseReduxSetReturn, UseReduxStateOptions } from '../types'
import { resetReduxState } from '..'

export function useReduxReset<T>(pathMap?: PathStoreMap<T>, { optional }: UseReduxStateOptions<T> = {}): () => UseReduxSetReturn<T> {
  return useCallback(() => {
    if (!pathMap && !optional) {
      throw new Error('Missing pathmap')
    }

    return resetReduxState(pathMap!)
  }, [pathMap])
}
