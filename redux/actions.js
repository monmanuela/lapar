// action types
export const ADD_COUNT = 'ADD_COUNT'

// action creators
export const addCount = increment => {
  console.log("calling add count w incr: " + increment)  
  return ({
    type: ADD_COUNT,
    payload: increment,
  })
}
