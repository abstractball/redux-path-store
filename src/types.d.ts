interface ActionMap<T> {
  [key: string]: StateReducer<T>
}

type OnStateChange<T> = ((state: T, action: any, newState: T) => any) | undefined
type StateReducer<T> = (state: T, payload: { key: string, value: any }) => T
type ValueOf<T> = T[keyof T];
