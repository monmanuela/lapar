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
export const SET_USER_DATA = 'SET_USER_DATA'
export const UPDATE_USER_FROM_FIREBASE_LISTENER = 'UPDATE_USER_FROM_FIREBASE_LISTENER'

// action creators
export const updateLocation = locations => {
	return({
		type: UPDATE_LOCATION,
		payload: locations
	})
}

export const updateUserFromFirebaseListener = user => {
  console.log("act crt uuffl")
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

// async action creators
export const updateUserIfLoggedIn = user => async dispatch => {
  try {
    dispatch(updateUserFromFirebaseListener(user))
    const userData = await fetchUserData(user.uid)
    dispatch({type: SET_USER_DATA, payload: userData})
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

export const signUpUser = (email, password, displayName) => async dispatch => {
  if (email.length === 0 || password.length === 0 || displayName.length === 0) {
    dispatch({type: SIGN_UP_FAIL, payload: {errMessage: "Email, password or display name cannot be empty"}})
    return;
  }
  dispatch({type: SIGN_UP_START})
  try {
    const result = await firebaseSignUp(email, password, displayName)

    dispatch({type: SIGN_UP_SUCCESS, payload: result})
    dispatch({type: SET_USER_DATA, payload: {bio: '', preferences: '', userId: result.uid}})
  } catch (err) {
    dispatch({type: SIGN_UP_FAIL, payload: {errMessage: err.message}})
  }
}

// helper functions
firebaseSignUp = async (email, password, displayName) => {
  try {
    const db = firebase.database()
    const finalUser = firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser
        user.updateProfile({
          displayName: displayName,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/newlapar-19607.appspot.com/o/avatar%2Fhappy.png?alt=media&token=51fa7ac1-bab9-4078-9f44-2db77f0f04bd",
        })
        db.ref('users/' + user.uid).set({
          bio: '',
          preferences: '',
          userId: user.uid,
        })
        return user
      })
    return finalUser
    // const user = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    // user.updateProfile({
    //   displayName: displayName,
    //   photoURL: "https://firebasestorage.googleapis.com/v0/b/newlapar-19607.appspot.com/o/avatar%2Fhappy.png?alt=media&token=51fa7ac1-bab9-4078-9f44-2db77f0f04bd",
    // })
    // .then(() => {
    //   console.log("setting db for user uid: " + user.uid)
    //   db.ref('users/' + user.uid).set({
    //     bio: '',
    //     preferences: '',
    //     userId: user.uid,
    //   })
    // })
    // return user
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
  return userData
}
