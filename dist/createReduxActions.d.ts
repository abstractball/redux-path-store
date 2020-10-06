import { PathStoreMap } from './Helpers';
import PathStore from './PathStore';
declare function createReduxActions<T>(store: PathStore<T>, path: PathStoreMap<any>, actionMap?: ActionMap): ActionMap;
export default createReduxActions;
