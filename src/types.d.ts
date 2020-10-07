interface ActionMap {
  [key: string]: StateReducer
}

type OnStateChange<T> = ((state: T, action: any, newState: T) => any) | undefined
type StateReducer = (state: State, payload: { key: string, value: any }) => State
type ValueOf<T> = T[keyof T];

type TypedObj<T extends string = string> = {
  [key in T]: any
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

