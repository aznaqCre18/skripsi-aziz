import * as actionTypes from './actionTypes';

const initialState = {
  dataDashboard: {},
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_DASHBOARD:
      console.log(data, "<< DATRA");
      return {
        ...state,
        dataDashboard: data,
      }
    default:
      return state;
  }
}

export default reducer;