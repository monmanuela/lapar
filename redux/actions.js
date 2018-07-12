import firebase from 'react-native-firebase'

// action types
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const LOG_IN_START = 'LOG_IN_START'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAIL = 'LOG_IN_FAIL'
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS'
export const UPDATE_USER_FROM_FIREBASE_LISTENER = 'UPDATE_USER_FROM_FIREBASE_LISTENER'

// action creators
export const updateLocation = locations => {
	return({
		type: UPDATE_LOCATION,
		payload: locations
	})
}

export const updateUserFromFirebaseListener = user => {
  return({
    type: UPDATE_USER_FROM_FIREBASE_LISTENER,
    payload: user
  })
}

export const logOutUser = () => {
  return({
    type: LOG_OUT_SUCCESS,
  })
}

fetchUserData = async userId => {
  const userData = await firebase.database().ref("users").orderByKey()
    .equalTo(userId).once("value")
    .then(snapshot => {
      return snapshot.val()[userId]
    })
  console.log("user data inside fetchUserData: " + JSON.stringify(userData))
  return userData
}

// async action creators
export const updateUserIfLoggedIn = user => async dispatch => {
  try {
    dispatch(updateUserFromFirebaseListener(user))
    const userData = await fetchUserData(user.uid)
    console.log("user data inside updateUserFromFirebaseListener: " + JSON.stringify(userData))
    dispatch({type: FETCH_USER_DATA_SUCCESS, payload: userData})
  } catch (err) {
    console.log(err)
  }
}

export const logInUser = (email, password) => async dispatch => {
  if (email.length === 0 || password.length === 0) {
    dispatch({type: LOG_IN_FAIL, payload: {errCode: 404, errMessage: "Email or password cannot be empty"}})
    return;
  }
  dispatch({type: LOG_IN_START})
  try {
    const result = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    const currentUser = result.user
    console.log("log in user: " + JSON.stringify(currentUser))
    dispatch({type: LOG_IN_SUCCESS, payload: currentUser})

    const userData = await fetchUserData(currentUser.uid)
    console.log("user data inside logInUser: " + JSON.stringify(userData))
    dispatch({type: FETCH_USER_DATA_SUCCESS, payload: userData})

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
    // upload user data too
    console.log("sign up user: " + JSON.stringify(user.user))
    dispatch({type: SIGN_UP_SUCCESS, payload: user.user})
  } catch (err) {
    dispatch({type: SIGN_UP_FAIL, payload: {errCode: err.code, errMessage: err.message}})
  }
}
