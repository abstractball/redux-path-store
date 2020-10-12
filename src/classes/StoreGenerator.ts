import { configureStore, ConfigureStoreOptions, createReducer, EnhancedStore } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import Property from './Property'
import { createReduxActions } from '../utils/createReduxActions'
import { OnStateChange, PathStoreMap, PathStoreOptions } from '../types'

class StoreGenerator<T> {
  // The automatically generated pathMap from the initialState provided.
  pathMap: PathStoreMap<T>

  // initialState for reference between building, not really used otherwise.
  initialState: T

  // Callback for when the state changes
  onStateChange: OnStateChange<T>

  // The redux store we create.
  store: EnhancedStore<T>

  // Property for the initialState.
  property: Property<T>

  constructor(initialState: T, options: PathStoreOptions<T>) {
    this.initialState = initialState

    if (options.onStateChange) this.onStateChange = options.onStateChange

    this.store = this.createReduxStore(options.reduxStoreOptions ?? {})
    this.property = new Property<T>(this, '', '', this.initialState)
    this.pathMap = this.property.getMap()
  }

  createReduxStore(options: Partial<ConfigureStoreOptions>) {
    // Passing undefined due to the chicken/egg issue. Properties require a store but store actions require properties.
    // Its okay because we are using this only to generate the reducer and actions.
    const initialStateProp = new Property<T>(undefined, '', '', this.initialState)
    const reducer: Reducer<T, any> = createReducer(this.initialState, createReduxActions<T>(this, initialStateProp.getMap()) as any)

    return configureStore<T>({ reducer, ...options } as any)
  }
}

export default StoreGenerator
