import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {addCount} from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
	locationCriterias: []
}

const store = createStore(reducer, INITIAL_STATE, applyMiddleware(thunk))
console.log(store.getState())

export default store
