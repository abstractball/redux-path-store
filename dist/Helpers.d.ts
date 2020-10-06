import { ConfigureStoreOptions, EnhancedStore } from '@reduxjs/toolkit';
import React from 'react';
import PathStore from './PathStore';
declare type MorphsAs<T> = {
    [key in keyof T]: PathStoreMap<T[key]>;
};
export declare type PathStoreMap<T> = MorphsAs<T> & {
    store: EnhancedStore;
    path: string;
    defaultValue: T;
    actionName: string;
};
export declare function createPathStore<T>(initialState: T, options?: Partial<ConfigureStoreOptions>, onStateChange?: OnStateChange): PathStore<T>;
export declare function getReduxState<T>(pathStoreMap: PathStoreMap<T>): any;
export declare function setReduxState<T>(pathStoreMap: PathStoreMap<T>, action: React.SetStateAction<T>): React.Dispatch<React.SetStateAction<T>>;
export {};
