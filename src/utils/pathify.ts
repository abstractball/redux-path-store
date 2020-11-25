import PathProp from '../classes/PathProp'

export function pathify<T>(state: T, props: { context?: React.Context<T>, reduxPath?: string } = {}) {
  const property = new PathProp<T>('', '', state)
  property.context = props.context
  property.reduxPath = props.reduxPath ?? ''
  property.load()

  return property.getMap()
}
