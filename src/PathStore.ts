import { configureStore, ConfigureStoreOptions, createReducer, EnhancedStore } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import createReduxActions from './createReduxActions'
import Property from './Property'
import { PathStoreMap } from './Helpers'

class PathStore<T> {
  map: PathStoreMap<T>

  initialState: T

  onStateChange: OnStateChange

  store: EnhancedStore<T>

  property: Property<T>

  constructor(initialState: T, options: Partial<ConfigureStoreOptions>, onStateChange: OnStateChange = undefined) {
    this.initialState = initialState
    this.onStateChange = onStateChange

    this.store = this.createReduxStore(options)
    this.property = new Property<T>(this.store, '', '', this.initialState)
    this.map = this.property.getMap()
  }

  createReduxStore(options: Partial<ConfigureStoreOptions>) {
    // Undefined store because we have the chicken/egg issue. Properties require a store but store actions require properties.
    // Just used for generating the redux actions.
    const initialStateProp = new Property<T>(undefined, '', '', this.initialState)
    const reducer: Reducer<T, any> = createReducer(this.initialState, createReduxActions<T>(this, initialStateProp.getMap()))

    return configureStore<T>({ reducer, ...options } as any)
  }
}

export default PathStore
