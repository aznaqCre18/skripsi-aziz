import * as actionTypes from './actionTypes';

const initialState = {
  dataMapel: [],
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_MAPEL:
      return {
        ...state,
        dataMapel: data,
      }
    default:
      return state;
  }
}

export default reducer;