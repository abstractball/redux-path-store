import { createPathStore, getReduxState, setReduxState } from './Helpers';
import useReduxState from './useReduxState';
import { EnhancedStore } from '@reduxjs/toolkit';
declare type MorphsAs<T> = {
    [key in keyof T]: PathStoreMap<T[key]>;
};
export declare type PathStoreMap<T> = MorphsAs<T> & {
    store: EnhancedStore;
    path: string;
    defaultValue: T;
    actionName: string;
};
export { createPathStore, useReduxState, getReduxState, setReduxState };
