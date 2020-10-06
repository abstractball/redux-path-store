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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReduxState = exports.getReduxState = exports.createPathStore = void 0;
var immutable = __importStar(require("object-path-immutable"));
var PathStore_1 = __importDefault(require("./PathStore"));
function createPathStore(initialState, options, onStateChange) {
    if (options === void 0) { options = {}; }
    if (onStateChange === void 0) { onStateChange = undefined; }
    return new PathStore_1.default(initialState, options, onStateChange);
}
exports.createPathStore = createPathStore;
function getReduxState(pathStoreMap) {
    return immutable.get(pathStoreMap.store.getState(), pathStoreMap.path);
}
exports.getReduxState = getReduxState;
function setReduxState(pathStoreMap, action) {
    if (typeof action === 'function') {
        action = action(getReduxState(pathStoreMap));
    }
    return pathStoreMap.store.dispatch({
        type: pathStoreMap.actionName,
        key: pathStoreMap.path,
        value: action,
    });
}
exports.setReduxState = setReduxState;
