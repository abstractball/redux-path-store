import PathStore from './PathStore';
import { PathStoreMap } from './index';
declare function createReduxActions<T>(store: PathStore<T>, path: PathStoreMap<any>, actionMap?: ActionMap): ActionMap;
export default createReduxActions;
