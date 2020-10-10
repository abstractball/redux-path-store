import StoreGenerator from '../classes/StoreGenerator'
import { PathStoreOptions } from '../index'

export function createStoreFromState<T>(initialState: T, options: PathStoreOptions<T>): StoreGenerator<T> {
  return new StoreGenerator<T>(initialState, options)
}
