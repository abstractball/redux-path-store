import { ConfigureStoreOptions } from '@reduxjs/toolkit';
import React from 'react';
import PathStore from './PathStore';
import { PathStoreMap } from './index';
export declare function createPathStore<T>(initialState: T, options?: Partial<ConfigureStoreOptions>, onStateChange?: OnStateChange<T>): PathStore<T>;
export declare function getReduxState<T>(pathStoreMap: PathStoreMap<T>): any;
export declare function setReduxState<T>(pathStoreMap: PathStoreMap<T>, action: React.SetStateAction<T>): React.Dispatch<React.SetStateAction<T>>;
