"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var createReduxActions_1 = __importDefault(require("./createReduxActions"));
var Property_1 = __importDefault(require("./Property"));
var PathStore = /** @class */ (function () {
    function PathStore(initialState, options, onStateChange) {
        if (onStateChange === void 0) { onStateChange = undefined; }
        this.initialState = initialState;
        this.onStateChange = onStateChange;
        this.store = this.createReduxStore(options);
        this.property = new Property_1.default(this.store, '', '', this.initialState);
        this.map = this.property.getMap();
    }
    PathStore.prototype.createReduxStore = function (options) {
        // Undefined store because we have the chicken/egg issue. Properties require a store but store actions require properties.
        // Just used for generating the redux actions.
        var initialStateProp = new Property_1.default(undefined, '', '', this.initialState);
        var reducer = toolkit_1.createReducer(this.initialState, createReduxActions_1.default(this, initialStateProp.getMap()));
        return toolkit_1.configureStore(__assign({ reducer: reducer }, options));
    };
    return PathStore;
}());
exports.default = PathStore;
