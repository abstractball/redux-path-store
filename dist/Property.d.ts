import { EnhancedStore } from '@reduxjs/toolkit';
import { PathStoreMap } from './Helpers';
export declare function camelToSnake(str: string): string;
declare class Property<T> {
    path: string;
    name: string;
    properties: Property<ValueOf<T>>[];
    store: EnhancedStore | undefined;
    value: T;
    map: PathStoreMap<T>;
    constructor(store: EnhancedStore | undefined, path: string, name: string, value: T);
    isObject(): boolean;
    getMapValue(): {
        path: string;
        store: EnhancedStore | undefined;
        defaultValue: any;
        actionName: string;
    };
    getMap(): PathStoreMap<T>;
    createProperty<T>(path: string, name: string, value: T): Property<T>;
    getProperties(): Property<ValueOf<T>>[];
    getReduxActionName(): string;
}
export default Property;
