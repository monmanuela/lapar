import {combineReducers} from 'redux'
// import store from './store'
import {ADD_COUNT, UPDATE_LOCATION} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  // if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  // return state
  return state
}

const countsReducer = (state = {}, action) => {
  // console.log("store in reducer: " + store.getState())
  console.log("state: " + JSON.stringify(state))
  
  switch (action.type) {
    // case UPDATE_USER:
    //   return merge(state, action.payload)
    // case UPDATE_CONTACT:
    //   return merge(state, {prevContact: action.payload})
    case ADD_COUNT:
      return action.payload
      // console.log("result aft reducer: " + JSON.stringify(merge(state, {counts: action.payload})))
      // return merge(state, {counts: action.payload})
    default:
      return state
  }
}

const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return action.payload
  }
  return state
}

console.log(countsReducer)

const reducer = combineReducers({
  contact: contactReducer,
  counts: countsReducer,
  locationCriterias: locationReducer
})

export default reducer
