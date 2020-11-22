import { useCallback, useState } from 'react'
import { PathStoreMap, UseReduxSetReturn, UseReduxStateOptions } from '../types'
import { resetReduxState } from '..'

export function useReduxReset<T>(pathMap: PathStoreMap<T>, { localState }: UseReduxStateOptions<T> = {}): () => UseReduxSetReturn<T> {
  const [defaultData] = useState(localState ? localState[0] : undefined)

  return useCallback(() => {
    if (localState && defaultData) return localState[1](defaultData) as any

    return resetReduxState(pathMap)
  }, [pathMap])
}
