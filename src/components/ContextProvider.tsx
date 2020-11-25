import React, { PropsWithChildren, useEffect, useState } from 'react'
import { PathContext } from '../types'
import { devToolsStore } from '../utils/withDevTools'
import { camelToSnake } from '../utils/camelToSnake'

interface Props extends PropsWithChildren<any> {
  contextPath: PathContext<any>
}

export default function ContextProvider({ contextPath, children }: Props) {
  const [state, setState] = useState(contextPath.initialState)
  const Context = contextPath.context

  useEffect(() => {
    devToolsStore && devToolsStore.dispatch({
      [contextPath.reduxPath]: { ...contextPath.initialState },
    }, `${camelToSnake(contextPath.reduxPath).toUpperCase()}_INIT`)
  }, [])

  return (
    <Context.Provider value={{
      ...state,
      setContext: setState,
    }}
    >
      {children}
    </Context.Provider>
  )
}
