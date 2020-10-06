"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers_1 = require("../Helpers");
test('path map correctly returns path', function () {
    var farm = { fruits: { apples: true } };
    var store = Helpers_1.createPathStore(farm);
    var Paths = store.map;
    expect(Paths.fruits.apples.path).toBe('fruits.apples');
    expect(Paths.fruits.apples).toStrictEqual({ path: 'fruits.apples', defaultValue: true });
});
test('simple path map returns correctly', function () {
    var defaultProps = {
        cat: {
            name: 'Athena',
        },
    };
    expect(Helpers_1.createPathStore(defaultProps).map).toStrictEqual({
        path: '',
        cat: {
            path: 'cat',
            name: {
                path: 'cat.name',
                defaultValue: 'Athena',
            },
            defaultValue: { name: 'Athena' },
        },
        defaultValue: {
            cat: {
                name: 'Athena',
            },
        },
    });
});
test('complex path map returns correctly', function () {
    var user = {
        name: '',
        email: '',
        friends: [
            {
                name: 'Sally',
            },
            {
                name: 'Joe',
            },
        ],
    };
    var userPathMap = {
        path: '',
        defaultValue: { name: '', email: '', friends: [{ name: 'Sally' }, { name: 'Joe' }] },
        name: { path: 'name', defaultValue: '' },
        email: { path: 'email', defaultValue: '' },
        friends: {
            0: {
                path: 'friends.0',
                name: {
                    path: 'friends.0.name',
                    defaultValue: 'Sally',
                },
                defaultValue: { name: 'Sally' },
            },
            1: {
                path: 'friends.1',
                name: {
                    path: 'friends.1.name',
                    defaultValue: 'Joe',
                },
                defaultValue: { name: 'Joe' },
            },
            path: 'friends',
            defaultValue: [{ name: 'Sally' }, { name: 'Joe' }],
        },
    };
    expect(Helpers_1.createPathStore(user).map).toStrictEqual(userPathMap);
});
