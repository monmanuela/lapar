import {combineReducers} from 'redux'
// import store from './store'
import {
  ADD_COUNT, 
  UPDATE_LOCATION, 
  LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAIL, 
  LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_FAIL
} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const initialState = {}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return action.payload
    default:
      return state
  }
}

const logInReducer = (state = initialState, action) => {
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
    case LOG_OUT_START:
      console.log("LOG_OUT_START")
      return state
    case LOG_OUT_SUCCESS:
      console.log("LOG_OUT_SUCCESS")
      return merge(state, {currentUser: null})
    case LOG_OUT_FAIL:
      console.log("LOG_OUT_FAIL")
      return state
    default:
      return state
  }
}

const reducer = combineReducers({
  locationCriterias: locationReducer,
  user: logInReducer,
})

export default reducer
