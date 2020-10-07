import { ConfigureStoreOptions } from '@reduxjs/toolkit'
import StoreGenerator from '../classes/StoreGenerator'

export function createStoreFromState<T>(initialState: T, options: Partial<ConfigureStoreOptions> = {}, onStateChange: OnStateChange<T> = undefined): StoreGenerator<T> {
  return new StoreGenerator<T>(initialState, options, onStateChange)
}
