import {combineReducers} from 'redux'
import {
  UPDATE_LOCATION, 
  LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAIL, 
  LOG_OUT_SUCCESS,
  SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAIL,
  UPDATE_USER_FROM_FIREBASE_LISTENER,
  SET_USER_DATA,
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

const userReducer = (state = initialState, action) => {
  console.log(action.type)

  switch (action.type) {
    case LOG_IN_SUCCESS:
      return merge(state, {currentUser: action.payload})
    case LOG_IN_FAIL:
      return merge(state, {errMessage: action.payload.errMessage})

    case SIGN_UP_SUCCESS:
      return merge(state, {currentUser: action.payload})
    case SIGN_UP_FAIL:
      return merge(state, {errMessage: action.payload.errMessage})

    case UPDATE_USER_FROM_FIREBASE_LISTENER:
      return merge(state, {currentUser: action.payload})

    case LOG_OUT_SUCCESS:
      return merge(state, {currentUser: null})

    case SET_USER_DATA:
      return merge(state, {userData: action.payload})
      
    default:
      return state
  }
}

const reducer = combineReducers({
  locationCriterias: locationReducer,
  user: userReducer,
})

export default reducer
