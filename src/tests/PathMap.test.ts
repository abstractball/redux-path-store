import { createPathStore } from '../Helpers'

test('path map correctly returns path', () => {
  const farm = { fruits: { apples: true } }
  const store = createPathStore(farm)
  const Paths = store.map

  expect(Paths.fruits.apples.path).toBe('fruits.apples')
  expect(Paths.fruits.apples).toStrictEqual({ path: 'fruits.apples', defaultValue: true })
})

test('simple path map returns correctly', () => {
  const defaultProps = {
    cat: {
      name: 'Athena',
    },
  }

  expect(createPathStore(defaultProps).map).toStrictEqual({
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
  })
})

test('complex path map returns correctly', () => {
  const user = {
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
  }

  const userPathMap = {
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
  }

  expect(createPathStore(user).map).toStrictEqual(userPathMap)
})
