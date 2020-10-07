import { ConfigureStoreOptions } from '@reduxjs/toolkit'
import PathStore from '../classes/PathStore'

export function createPathStore<T>(initialState: T, options: Partial<ConfigureStoreOptions> = {}, onStateChange: OnStateChange<T> = undefined): PathStore<T> {
  return new PathStore<T>(initialState, options, onStateChange)
}
