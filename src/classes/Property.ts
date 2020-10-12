import { EnhancedStore } from '@reduxjs/toolkit'
import StoreGenerator from './StoreGenerator'
import { camelToSnake } from '../utils/camelToSnake'
import { PathStoreMap, ValueOf } from '../types'

class Property<T> {
  path: string

  name: string

  properties: Property<ValueOf<T>>[]

  store: EnhancedStore | undefined

  generator: StoreGenerator<any> | undefined

  value: T

  map: PathStoreMap<T>

  constructor(generator: StoreGenerator<any> | undefined, path: string, name: string, value: T) {
    this.generator = generator
    this.store = generator ? generator.store : undefined
    this.path = path
    this.name = name
    this.value = value
    this.properties = this.getProperties()
    this.map = this.getMap()
  }

  isObject() {
    return this.value !== undefined && this.value !== null && typeof this.value === 'object'
  }

  getMapValue(): { path: string, store: EnhancedStore | undefined, defaultValue: any, actionName: string } {
    return {
      path: this.path,
      store: this.store,
      actionName: this.getReduxActionName(),
      defaultValue: this.value,
    }
  }

  getMap(): PathStoreMap<T> {
    const map: any = { ...(this.getMapValue()) }

    this.properties.forEach((property) => {
      map[property.name] = property.getMap()
    })

    return map as PathStoreMap<T>
  }

  // Leverage typescript auto parsing value types.
  createProperty<T>(path: string, name: string, value: T) {
    return new Property<T>(this.generator as any, path, name, value)
  }

  getProperties(): Property<ValueOf<T>>[] {
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
    return camelToSnake(this.path).toUpperCase()
  }
}

export default Property
