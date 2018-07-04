import {createStore} from 'redux'

import {addCount} from './actions'
import reducer from './reducer'

const store = createStore(reducer)

store.dispatch(addCount(3))

console.log(store.getState())

export default store
