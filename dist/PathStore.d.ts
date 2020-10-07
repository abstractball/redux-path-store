import { ConfigureStoreOptions, EnhancedStore } from '@reduxjs/toolkit';
import Property from './Property';
import { PathStoreMap } from './index';
declare class PathStore<T> {
    map: PathStoreMap<T>;
    initialState: T;
    onStateChange: OnStateChange<T>;
    store: EnhancedStore<T>;
    property: Property<T>;
    constructor(initialState: T, options: Partial<ConfigureStoreOptions>, onStateChange?: OnStateChange<T>);
    createReduxStore(options: Partial<ConfigureStoreOptions>): EnhancedStore<T, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<T, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<T, import("redux").AnyAction, undefined>]>;
}
export default PathStore;
