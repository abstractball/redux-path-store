"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 Produces a action map from a path map.
 Converts a path map to a action map

 Input: {path: '', user: {path: 'user', fruits: {path: 'fruits', value: []}, value: ''}}
 Output: {'USER': rootReducer, 'USER_FRUITS': rootReducer}}
 */
var immutable = __importStar(require("object-path-immutable"));
function createReduxActions(store, path, actionMap) {
    if (actionMap === void 0) { actionMap = {}; }
    // All actions are ran through an immutable obj path set of the rootState.
    var rootReducer = function (prevState, action) {
        var newState = immutable.set(prevState, action.key, action.value);
        if (store.onStateChange) {
            var returnedStateChange = store.onStateChange(prevState, action, newState);
            if (returnedStateChange) {
                return returnedStateChange;
            }
        }
        return newState;
    };
    Object.keys(path).forEach(function (key) {
        if (!path[key] || !path[key].path)
            return;
        var pathValue = path[key].defaultValue;
        if (pathValue !== undefined && pathValue !== null && typeof pathValue === 'object' && !Array.isArray(pathValue)) {
            createReduxActions(store, path[key], actionMap);
        }
        actionMap[path[key].actionName] = rootReducer;
    });
    return actionMap;
}
exports.default = createReduxActions;
