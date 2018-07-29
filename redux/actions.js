import firebase from 'react-native-firebase'

// action types
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const UPDATE_PREFERENCE = 'UPDATE_PREFERENCE'
export const LOG_IN_START = 'LOG_IN_START'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAIL = 'LOG_IN_FAIL'
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const SET_USER_DATA = 'SET_USER_DATA'
export const UPDATE_USER_FROM_FIREBASE_LISTENER = 'UPDATE_USER_FROM_FIREBASE_LISTENER'

// other constants
export const NORMAL = 'NORMAL'
export const STALL = 'STALL'

// action creators
export const updateLocation = locations => {
	return({
		type: UPDATE_LOCATION,
		payload: locations
	})
}

export const updatePreferences = pref => {
  return({
    type: UPDATE_PREFERENCE,
    payload: pref
  })
}

export const updateUserFromFirebaseListener = user => {
  console.log("update user from firebase listener")
  console.log("the user: " + JSON.stringify(user))
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

export const indicateSignUpStall = () => {
  return({
    type: SIGN_UP_START,
    payload: STALL
  })
}

export const indicateSignUpNormal = () => {
  return({
    type: SIGN_UP_START,
    payload: NORMAL
  })
}

export const setUserData = data => {
  return({
    type: SET_USER_DATA,
    payload: data
  })
}

// async action creators
export const updateUserIfLoggedIn = user => async dispatch => {
  try {
    dispatch(updateUserFromFirebaseListener(user))
    const userData = await fetchUserData(user.uid)
    dispatch(setUserData(userData))
  } catch (err) {
    console.log(err)
  }
}

export const updateUserIfNewSignUp = user => async dispatch => {
  try {
    dispatch(updateUserFromFirebaseListener(user))
    // const userData = await fetchUserData(user.uid)
    // don't fetch user data just yet?
    // dispatch({type: SET_USER_DATA, payload: userData})
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
    dispatch({type: LOG_IN_SUCCESS, payload: currentUser})

    const userData = await fetchUserData(currentUser.uid)
    dispatch({type: SET_USER_DATA, payload: userData})

  } catch (err) {
    dispatch({type: LOG_IN_FAIL, payload: {errMessage: err.message}})
  }
}

// export const signUpStallOwner(email, password, stallName, stallLocation) => async dispatch => {
//   if (email.length === 0 || password.length === 0 || displayName.length === 0) {
//     dispatch({type: SIGN_UP_FAIL, payload: {errMessage: "Email, password or display name cannot be empty"}})
//     return;
//   }
//   dispatch({type: SIGN_UP_START})
//   try {
//     const result = await firebaseSignUpStall(email, password, stallName, stallLocation)
//     console.log("sign up result: " + JSON.stringify(result))
//     dispatch({type: SIGN_UP_SUCCESS, payload: result})
//     dispatch({type: SET_USER_DATA, payload: {stallLocation: stallLocation, userId: result.uid}})
//   }
// }

export const signUpUser = (email, password, displayName) => async dispatch => {
  if (email.length === 0 || password.length === 0 || displayName.length === 0) {
    dispatch({type: SIGN_UP_FAIL, payload: {errMessage: "Email, password or display name cannot be empty"}})
    return;
  }
  dispatch(indicateSignUpNormal())
  try {
    // dispatch action to tell that this is Normal User
    const result = await firebaseSignUpUser(email, password, displayName)
    console.log("sign up result: " + JSON.stringify(result))
    dispatch({type: SIGN_UP_SUCCESS, payload: result})
    dispatch({type: SET_USER_DATA, payload: {bio: '', userId: result.uid}})
  } catch (err) {
    dispatch({type: SIGN_UP_FAIL, payload: {errMessage: err.message}})
  }
}

firebaseSignUpUser = async (email, password, displayName) => {
  try {
    const db = firebase.database()
    const result = firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser
        
        db.ref('users/' + user.uid).set({
          bio: '',
          userId: user.uid,
        })
        
        const newUser = user
          .updateProfile({
            displayName: displayName,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/newlapar-19607.appspot.com/o/avatar%2Fhappy.png?alt=media&token=51fa7ac1-bab9-4078-9f44-2db77f0f04bd",
          })
          .then(() => {
            const newUser = firebase.auth().currentUser
            return newUser
          })
          .catch(err => console.log(err))
        return newUser
      })
    return result
  } catch(err) {
    console.log("errmsg: " + err.message)
    throw new Error(err.message)
  }
}

fetchUserData = async userId => {
  console.log("userid: " + userId)
  const userData = await firebase.database().ref("users").orderByKey()
    .equalTo(userId).once("value")
    .then(snapshot => {
      return snapshot.val()[userId]
    })
  console.log("FETCHED USER DATA: " + JSON.stringify(userData))
  return userData
}
