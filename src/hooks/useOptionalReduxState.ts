import { useSelector } from 'react-redux'
import * as immutable from 'object-path-immutable'
import React, { useCallback, useState } from 'react'
import { setReduxState } from '../utils/setReduxState'
import { PathStoreMap, UseOptionalReduxState, UseReduxState } from '../types'
import { resetReduxState } from '../utils/resetReduxState'

/*
Return a redux state modifier if we use redux
otherwise return a local state modifier.
 */
export function useOptionalReduxState<T>(pathMap: PathStoreMap<T> | undefined, defaultValue: any = undefined): UseOptionalReduxState<T> | UseReduxState<T> {
  const reduxValue: T = useSelector((store: any) => (pathMap ? immutable.get(store, pathMap.path) : {}))

  const setReduxValue = useCallback(
    // @ts-ignore
    (action: React.SetStateAction<T>) => setReduxState(pathMap ?? null, action),
    [pathMap],
  )

  // @ts-ignore
  const resetReduxValue = useCallback(() => resetReduxState(pathMap ?? null), [pathMap])

  const [localValue, setLocalValue] = useState<T>(defaultValue)

  if (pathMap) return [reduxValue, setReduxValue, resetReduxValue] as UseReduxState<T>

  return [localValue, setLocalValue] as UseOptionalReduxState<T>
}
