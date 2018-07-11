import firebase from 'react-native-firebase'

// action types
export const ADD_COUNT = 'ADD_COUNT'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const LOG_IN_START = 'LOG_IN_START'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAIL = 'LOG_IN_FAIL'

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
export const logInUser = (email, password) => async dispatch => {
  if (email.length === 0 || password.length === 0) {
    dispatch({type: LOG_IN_FAIL, payload: {errCode: 404, errMessage: "Email or password cannot be empty"}})
    return;
  }
  dispatch({type: LOG_IN_START})
  try {
    const user = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    console.log("user in actions: " + JSON.stringify(user.user))
    dispatch({type: LOG_IN_SUCCESS, payload: user.user})
  } catch (err) {
    dispatch({type: LOG_IN_FAIL, payload: {errCode: err.code, errMessage: err.message}})
  }
}
