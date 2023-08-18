import * as actionTypes from './actionTypes';

const initialState = {
  dataGaji: [],
  detailGaji: [],
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_GAJI:
      return {
        ...state,
        dataGaji: data,
      }
    case actionTypes.GET_DATA_GAJI_BY_ID_GURU:
      return {
        ...state,
        dataGaji: data,
      }
    default:
      return state;
  }
}

export default reducer;