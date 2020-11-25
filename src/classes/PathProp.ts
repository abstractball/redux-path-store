import { EnhancedStore } from '@reduxjs/toolkit'
import StoreGenerator from './StoreGenerator'
import { camelToSnake } from '../utils/camelToSnake'
import { PathPropMap, PathStoreMap, ValueOf } from '../types'

class PathProp<T> {
  path: string

  name: string

  properties?: PathProp<ValueOf<T>>[]

  store: EnhancedStore | undefined

  generator: StoreGenerator<any> | undefined

  context?: React.Context<any>

  reduxPath: string = ''

  value: T

  map?: PathStoreMap<T>

  constructor(path: string, name: string, value: T) {
    this.path = path
    this.name = name
    this.value = value
  }

  load() {
    this.properties = this.getProperties()
    this.map = this.getMap()
  }

  isObject() {
    return this.value !== undefined && this.value !== null && typeof this.value === 'object'
  }

  getMapValue(): PathPropMap<T> {
    return {
      path: this.path,
      store: this.store,
      context: this.context,
      reduxPath: this.reduxPath,
      actionName: this.getReduxActionName(),
      defaultValue: this.value,
    }
  }

  getMap(): PathStoreMap<T> {
    if (!this.properties) {
      throw new Error('Not loaded')
    }

    const map: any = { ...(this.getMapValue()) }

    this.properties.forEach((property) => {
      map[property.name] = property.getMap()
    })

    return map as PathStoreMap<T>
  }

  // Leverage typescript auto parsing value types.
  createProperty<T>(path: string, name: string, value: T) {
    const subProperty = new PathProp<T>(path, name, value)
    subProperty.generator = this.generator
    subProperty.context = this.context
    subProperty.reduxPath = this.reduxPath

    subProperty.load()
    return subProperty
  }

  getProperties(): PathProp<ValueOf<T>>[] {
    if (!this.isObject() || Array.isArray(this.value)) return []

    return Object.keys(this.value).map((key) => {
      // beginning of object? dont append an '.', just use its key.
      const childPropertyPath = this.path !== '' ? `${this.path}.${key}` : key
      const childPropertyValue = this.value[key as keyof T]

      // loop over again into the child object.
      return this.createProperty(childPropertyPath, key, childPropertyValue)
    })
  }

  getReduxActionName(): string {
    return camelToSnake(`${this.reduxPath}_${this.path}`).toUpperCase()
  }
}

export default PathProp
