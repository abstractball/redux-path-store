/*
 Produces a action map from a path map.
 Converts a path map to a action map

 Input: {path: '', user: {path: 'user', fruits: {path: 'fruits', value: []}, value: ''}}
 Output: {'USER': rootReducer, 'USER_FRUITS': rootReducer}}
 */
import * as immutable from 'object-path-immutable'
import PathStore from '../classes/PathStore'
import { PathStoreMap } from '../index'

export function createReduxActions<T>(store: PathStore<T>, path: PathStoreMap<any>, actionMap: ActionMap = {}) {
  // All actions are ran through an immutable obj path set of the rootState.
  const rootReducer = (prevState: T, action: { key: string, value: any }) => {
    const newState = immutable.set(prevState, action.key, action.value)

    if (store.onStateChange) {
      const returnedStateChange = store.onStateChange(prevState, action, newState)

      if (returnedStateChange) {
        return returnedStateChange
      }
    }

    return newState
  }

  Object.keys(path).forEach((key) => {
    if (!path[key] || !path[key].path) return

    const pathValue = path[key].defaultValue

    if (pathValue !== undefined && pathValue !== null && typeof pathValue === 'object' && !Array.isArray(pathValue)) {
      createReduxActions(store, path[key], actionMap)
    }

    actionMap[path[key].actionName] = rootReducer
  })

  return actionMap
}
