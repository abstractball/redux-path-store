import { PathStoreMap, setReduxState } from '../index'

export function appendRootState<T>(pathMap: PathStoreMap<T>, value: any) {
  setReduxState(pathMap, (curValue: any) => ({ ...curValue, ...value }))
}
