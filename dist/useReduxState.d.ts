import React from 'react';
import { PathStoreMap } from './index';
declare function useReduxState<T>(pathMap: PathStoreMap<T>): [T, React.Dispatch<React.SetStateAction<T>>, () => React.Dispatch<React.SetStateAction<T>>];
export default useReduxState;
