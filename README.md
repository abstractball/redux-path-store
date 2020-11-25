# Redux Path Store
Simplified redux store management leveraging the power of pathing objects.

# Introduction
A path store is simply an automatically generated redux store which includes the reducers
and actions based upon the initial state it was provided.

### Intuitive usage
Manage the redux state without having to dig into the management of
updating reducers or actions. Manage the redux state like you would manage the local state.

### Modern and Typed
Uses TypeScript out of the box and will only support the usage of React Hooks.
The redux store paths are automatically typed for you to prevent miss spellings and
add autofill for your IDE.

### Light and minimalistic
Its only built with a few files as it mostly piggy backs off of "@redux/toolkit" and "object-path-immutable".

### Redux DevTools
Works with Redux DevTools, the automatically generated actions will show up in the extension as
normal.

# Example

redux/rootStore.ts
```typescript
interface RootState {
    farms: {name: string}[]
    farmer: {
      name: string
      details: {
        age: number
      }
    }
}

const initialState = {
    farms: [{name: 'Red Farm'}],
    farmer: {name: 'Bobby Red', details: {age: 50}}
}

const {store, pathMap} = createStoreFromState<RootState>(initialState)

// Normal redux store, packaged with auto generated actions/reducers based upon initialState.
export const rootStore = store

// A pathProp pathing map of your Store to be consumed by your "useReduxState" hook.
export const Root = pathMap

console.log(Root.farms) // "farms"
console.log(Root.farmer) // "farmer"
console.log(Root.farmer.details.age) // "farmer.details.age"
console.log(Root.doggy) // undefined, typescript error will occur.
```

components/Farms.tsx
```typescript
import {Root} from './redux/rootStore'
import {useReduxState} from 'redux-path-store'

const Farms: React.FC = () => {
  // Local State
  const [animals, setAnimals] = useState([])

  // Redux State
  const [farmerAge, setFarmerAge] = useReduxState(Root.farmer.details.age)
  const [farms, setFarms] = useReduxState(Root.farms)
  const [farmer, setFarmer] = useReduxState(Root.farmer)
  
  useEffect(() => {
      // Redux action/reducer and dispatch all taken care of.
      setFarms((farms) => ({name: 'Blue Farm'})) // Action dispatched "FARMS"
      setFarmerAge(25) // Action dispatched "FARMER-DETAILS-AGE"
  }, [])

  return (<>
    {farms.map((farm) => <div>{farm.name}</div>)}
  </>)
}
```
