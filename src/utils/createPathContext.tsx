import { createContext } from 'react'
import { PathContext } from '../types'
import { pathify } from './pathify'

export function createPathContext<T>(initialState: T, reduxPath: string): PathContext<T> {
  const context = createContext(initialState)
  const paths = pathify(initialState, {
    context,
    reduxPath,
  })

  return {
    paths,
    initialState,
    context,
    reduxPath,
  }
}
