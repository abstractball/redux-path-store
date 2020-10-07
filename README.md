# Redux Path Store
Simplified redux store management leveraging the power of pathing objects.

# Introduction
A path store is simply an automatically generated redux store which includes the reducers
and actions based upon the initialState it was provided.

### Intuitive usage
Manage the redux state without having to dig into the management of
updating reducers or actions. Manage the redux state like you would manage a local state.

### Modern
This package uses TypeScript out of the box and will only support the usage of React Hooks.

### Light and minimalistic
This package is very simple, only using files which mostly piggy backs off of "@redux/toolkit"
and "object-path-immutable".

### Redux DevTool friendly
This package works with Redux DevTool, your automatically generated actions will
showup in extension.

# Example

redux/RootStore.ts
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

const {store, paths} = generateStoreFromState<RootState>(initialState)

// Normal Redux Store, packaged with auto generated actions/reducers based upon initialState.
export const rootStore = store

// map of the object paths sourced from your initialState to be consumed
// by your "useReduxState" hook.
export const Root = paths

console.log(Root.farms) // "farms"
console.log(Root.farmer) // "farmer"
console.log(Root.farmer.details.age) // "farmer.details.age"
console.log(Root.doggy) // undefined
```

components/Farms.tsx
```typescript
import {Root} from './redux/RootStore'
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
