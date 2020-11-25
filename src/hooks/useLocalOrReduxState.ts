import { useState } from 'react'
import { PathStoreMap, UseLocalOrReduxState } from '../types'
import { useReduxState } from '../index'

export function useLocalOrReduxState<T>(reduxPathMap: PathStoreMap<T>, initialLocalValue: T): UseLocalOrReduxState<T> {
  const reduxState = useReduxState(reduxPathMap, { optional: true })
  const localState = useState(initialLocalValue)

  if (reduxPathMap) {
    return reduxState
  }

  return localState
}
