import useReduxState from './hooks/useReduxState'
import { setReduxState } from './utils/setReduxState';
import { getReduxState } from './utils/getReduxState';
import { createStoreFromState } from './utils/createStoreFromState';

export {createStoreFromState, useReduxState, getReduxState, setReduxState}

export function testMe(name: string, anotherName: string, num: number) {
  console.log('hey')
}
