import { setReduxState } from '../index'
import { PathStoreMap } from '../types'

export function appendReduxState<T>(pathMap: PathStoreMap<T>, value: Partial<T>) {
  return setReduxState(pathMap, (curValue: T) => ({ ...curValue, ...value }))
}
