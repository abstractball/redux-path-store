import { EnhancedStore } from '@reduxjs/toolkit'
import { PathStoreMap } from './Helpers'


export function camelToSnake(str: string) {
  return str.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase()
}

class Property<T> {
  path: string

  name: string

  properties: Property<ValueOf<T>>[]

  store: EnhancedStore | undefined

  value: T

  map: PathStoreMap<T>

  constructor(store: EnhancedStore | undefined, path: string, name: string, value: T) {
    this.store = store
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
    return new Property<T>(this.store, path, name, value)
  }

  getProperties(): Property<ValueOf<T>>[] {
    if (!this.isObject() || Array.isArray(this.value)) {
      return []
    }

    return Object.keys(this.value).map((key) => {
      // beginning of object? dont append an '.', just use its key.
      const childPropertyPath = this.path !== '' ? `${this.path}.${key}` : key
      const childPropertyValue = this.value[key as keyof T]

      // loop over again into the child object.
      return this.createProperty(childPropertyPath, key, childPropertyValue)
    })
  }

  getReduxActionName(): string {
    return camelToSnake(this.path.split('.').join('-')).toUpperCase()
  }
}

export default Property
