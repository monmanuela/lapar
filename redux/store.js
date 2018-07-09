import {createStore} from 'redux'

import {addCount} from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
	locationCriterias: []
}

const store = createStore(reducer, INITIAL_STATE)

store.dispatch(addCount(3))

console.log(store.getState())

export default store
