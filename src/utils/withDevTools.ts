// #region types
export type DevToolsMessageType = 'DISPATCH' | string;

export type DevToolsMessagePayload = {
  type?: string;
  state?: any;
};

export type DevToolsMessage = {
  type?: DevToolsMessageType;
  payload?: DevToolsMessagePayload;
};

export type DevTools = {
  init: () => void;
  connect: () => any;
  subscribe: (message: DevToolsMessage) => any;
  send: (action: { type: string; state?: any }, newState: any) => any;
  unsubscribe: () => any;
  dispatch: (action: { type: string }) => any;
  disconnect: () => any;
};

const isDEV = process.env.NODE_ENV === 'development'

export const withDevTools = isDEV
  && typeof window !== 'undefined'
  && (window as any).__REDUX_DEVTOOLS_EXTENSION__

const devTools: DevTools = !withDevTools
  ? null
  : (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()

export const devToolsStore = !withDevTools
  ? null
  : {
    ...devTools,
    dispatch: (newState: any, action: string) => {
      devTools && devTools.send({ type: action }, newState)
    },
  }
