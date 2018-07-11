import {combineReducers} from 'redux'
// import store from './store'
import {ADD_COUNT, UPDATE_LOCATION, LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAIL} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  return state
}

const countsReducer = (state = {}, action) => {
  console.log("state: " + JSON.stringify(state))
  
  switch (action.type) {
    case ADD_COUNT:
      return action.payload
    default:
      return state
  }
}

const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return action.payload
    default:
      return state
  }
}

const logInReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN_START:
      console.log("LOG_IN_START")
      return state
    case LOG_IN_SUCCESS:
      console.log("LOG_IN_SUCCESS")
      return merge(state, {currentUser: action.payload})
    case LOG_IN_FAIL:
      console.log("LOG_IN_FAIL")
      return merge(state, {errCode: action.payload.errCode, errMessage: action.payload.errMessage})
    default:
      return state
  }
}

const reducer = combineReducers({
  contact: contactReducer,
  counts: countsReducer,
  locationCriterias: locationReducer,
  user: logInReducer,
})

export default reducer
