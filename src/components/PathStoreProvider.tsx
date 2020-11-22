import { Store } from 'redux'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface Props extends PropsWithChildren<any> {
  store: Store
}

export default function PathStoreProvider({ store, children }: Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
