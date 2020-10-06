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
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnake = void 0;
function camelToSnake(str) {
    return str.replace(/[\w]([A-Z])/g, function (m) { return m[0] + "_" + m[1]; }).toLowerCase();
}
exports.camelToSnake = camelToSnake;
var Property = /** @class */ (function () {
    function Property(store, path, name, value) {
        this.store = store;
        this.path = path;
        this.name = name;
        this.value = value;
        this.properties = this.getProperties();
        this.map = this.getMap();
    }
    Property.prototype.isObject = function () {
        return this.value !== undefined && this.value !== null && typeof this.value === 'object';
    };
    Property.prototype.getMapValue = function () {
        return {
            path: this.path,
            store: this.store,
            actionName: this.getReduxActionName(),
            defaultValue: this.value,
        };
    };
    Property.prototype.getMap = function () {
        var map = __assign({}, (this.getMapValue()));
        this.properties.forEach(function (property) {
            map[property.name] = property.getMap();
        });
        return map;
    };
    // Leverage typescript auto parsing value types.
    Property.prototype.createProperty = function (path, name, value) {
        return new Property(this.store, path, name, value);
    };
    Property.prototype.getProperties = function () {
        var _this = this;
        if (!this.isObject() || Array.isArray(this.value)) {
            return [];
        }
        return Object.keys(this.value).map(function (key) {
            // beginning of object? dont append an '.', just use its key.
            var childPropertyPath = _this.path !== '' ? _this.path + "." + key : key;
            var childPropertyValue = _this.value[key];
            // loop over again into the child object.
            return _this.createProperty(childPropertyPath, key, childPropertyValue);
        });
    };
    Property.prototype.getReduxActionName = function () {
        return camelToSnake(this.path.split('.').join('-')).toUpperCase();
    };
    return Property;
}());
exports.default = Property;
