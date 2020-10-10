import { PathStoreMap, setReduxState } from '../index'

export function appendReduxState<T>(pathMap: PathStoreMap<T>, value: any) {
  setReduxState(pathMap, (curValue: any) => ({ ...curValue, ...value }))
}
