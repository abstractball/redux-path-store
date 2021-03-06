import { Context, SetStateAction, useCallback, useContext } from 'react'
import * as immutable from 'object-path-immutable'
import { ContextStateWithSet, PathStoreMap, UseContextState } from '../types'
import { devToolsStore } from '../utils/withDevTools'

let devToolState = {}

export function useContextState<T>(pathMap: PathStoreMap<T>): UseContextState<T> {
  const context = useContext<T>(pathMap.context as Context<T>) as any as ContextStateWithSet<T>
  const value = immutable.get(context, pathMap.path) as any as T

  const setValue = useCallback((action: SetStateAction<T>) => {
    return context.setContext((prevContext: T) => {
      const value = action instanceof Function ? action(immutable.get(context, pathMap.path) as any as T) : action
      const newContext = immutable.set(prevContext, pathMap.path, value)

      const { reduxPath } = pathMap

      devToolState = {
        ...devToolState,
        [reduxPath]: { ...newContext },
      }

      devToolsStore && devToolsStore.dispatch(devToolState, pathMap.actionName)

      return newContext
    })
  }, [context, pathMap])

  const resetValue = useCallback(() => setValue(pathMap.defaultValue), [pathMap.defaultValue, setValue])

  return [value, setValue, resetValue]
}
