import { useSelector } from 'react-redux'
import * as immutable from 'object-path-immutable'
import React, { useCallback } from 'react'
import { setReduxState } from '../utils/setReduxState'
import { PathStoreMap, UseReduxState } from '../types'
import { resetReduxState } from '../utils/resetReduxState'

export function useReduxState<T>(pathMap: PathStoreMap<T>): UseReduxState<T> {
  const value = useSelector((store: any) => immutable.get(store, pathMap.path))

  const setValue = useCallback(
    (action: React.SetStateAction<T>) => setReduxState(pathMap, action),
    [pathMap],
  )

  const resetValue = useCallback(() => resetReduxState(pathMap), [pathMap])

  return [value, setValue, resetValue]
}
