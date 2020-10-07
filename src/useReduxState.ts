import { useSelector } from 'react-redux'
import * as immutable from 'object-path-immutable'
import React, { useCallback } from 'react'
import { PathStoreMap, setReduxState } from './index'

function useReduxState<T>(pathMap: PathStoreMap<T>): [T, React.Dispatch<React.SetStateAction<T>>, () => React.Dispatch<React.SetStateAction<T>>] {
  const value = useSelector((store: any) => immutable.get(store, pathMap.path))

  const setValue = useCallback<React.Dispatch<React.SetStateAction<T>>>(
    (action: any) => setReduxState(pathMap, action),
    [pathMap],
  )

  const resetValue = useCallback<(() => React.Dispatch<React.SetStateAction<T>>)>(() => setReduxState(pathMap, pathMap.defaultValue), [pathMap])

  return [value, setValue, resetValue]
}

export default useReduxState
