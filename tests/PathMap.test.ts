import { createStoreFromState } from '../src'

test('pathMap correctly returns path', () => {
  const farm = { fruits: { apples: true } }
  const store = createStoreFromState(farm)
  const Paths = store.pathMap

  expect(Paths.fruits.apples.path).toBe('fruits.apples')
  expect(Paths.fruits.apples).toMatchObject({ path: 'fruits.apples', defaultValue: true })
})

test('Another pathMap returns correctly', () => {
  const defaultProps = {
    cat: {
      name: 'Athena',
    },
  }

  expect(createStoreFromState(defaultProps).pathMap).toMatchObject({
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

test('complex path pathMap returns correctly', () => {
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
      path: 'friends',
      defaultValue: [{ name: 'Sally' }, { name: 'Joe' }],
    },
  }

  expect(createStoreFromState(user).pathMap).toMatchObject(userPathMap)
})
