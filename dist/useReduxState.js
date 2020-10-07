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
var react_redux_1 = require("react-redux");
var immutable = __importStar(require("object-path-immutable"));
var react_1 = require("react");
var index_1 = require("./index");
function useReduxState(pathMap) {
    var value = react_redux_1.useSelector(function (store) { return immutable.get(store, pathMap.path); });
    var setValue = react_1.useCallback(function (action) { return index_1.setReduxState(pathMap, action); }, [pathMap]);
    var resetValue = react_1.useCallback(function () { return index_1.setReduxState(pathMap, pathMap.defaultValue); }, [pathMap]);
    return [value, setValue, resetValue];
}
exports.default = useReduxState;
