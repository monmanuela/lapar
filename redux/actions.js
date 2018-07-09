// action types
export const ADD_COUNT = 'ADD_COUNT'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'

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