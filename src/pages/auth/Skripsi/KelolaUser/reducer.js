import * as actionTypes from './actionTypes';

const initialState = {
  dataUsers: [],
  dataUserEdit: {
    name: '',
    username: '',
  }
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_USERS:
      return {
        ...state,
        dataUsers: data,
      }
    case actionTypes.GET_DATA_USERS_BY_USERNAME:
      return {
        ...state,
        dataUserEdit: {
          name: data.name,
          username: data.username
        }
      }
    default:
      return state;
  }
}

export default reducer;