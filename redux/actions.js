import firebase from 'react-native-firebase'

// action types
export const ADD_COUNT = 'ADD_COUNT'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const LOG_IN_START = 'LOG_IN_START'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAIL = 'LOG_IN_FAIL'
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL'
export const LOG_OUT_START = 'LOG_OUT_START'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL'

// action creators
export const addCount = increment => {
  console.log("calling add count w incr: " + increment)  
  return ({
    type: ADD_COUNT,
    payload: increment,
  })
}

export const updateLocation = locations => {
	return({
		type: UPDATE_LOCATION,
		payload: locations
	})
}

// async action creators

export const logOutUser = () => {
  return({
    type: LOG_OUT_SUCCESS,
  })
  // dispatch({type: LOG_OUT_START})
  // try {
  //   await firebase.auth().signOut()
  //   dispatch({type: LOG_OUT_SUCCESS})
  // } catch (err) {
  //   dispatch({type: LOG_OUT_FAIL})
  //   throw new Error(err.message)
  // }

}

export const logInUser = (email, password) => async dispatch => {
  if (email.length === 0 || password.length === 0) {
    dispatch({type: LOG_IN_FAIL, payload: {errCode: 404, errMessage: "Email or password cannot be empty"}})
    return;
  }
  dispatch({type: LOG_IN_START})
  try {
    const result = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    console.log("log in user: " + JSON.stringify(result.user))
    dispatch({type: LOG_IN_SUCCESS, payload: result.user})
  } catch (err) {
    dispatch({type: LOG_IN_FAIL, payload: {errCode: err.code, errMessage: err.message}})
  }
}

export const signUpUser = (email, password) => async dispatch => {
  if (email.length === 0 || password.length === 0) {
    dispatch({type: SIGN_UP_FAIL, payload: {errCode: 404, errMessage: "Email or password cannot be empty"}})
    return;
  }
  dispatch({type: SIGN_UP_START})
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    console.log("sign up user: " + JSON.stringify(user.user))
    dispatch({type: SIGN_UP_SUCCESS, payload: user.user})
  } catch (err) {
    dispatch({type: SIGN_UP_FAIL, payload: {errCode: err.code, errMessage: err.message}})
  }
}
