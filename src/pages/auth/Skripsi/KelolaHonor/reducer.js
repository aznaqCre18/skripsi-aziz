import * as actionTypes from './actionTypes';

const initialState = {
  dataHonor: [],
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_HONOR:
      return {
        ...state,
        dataHonor: data,
      }
    default:
      return state;
  }
}

export default reducer;