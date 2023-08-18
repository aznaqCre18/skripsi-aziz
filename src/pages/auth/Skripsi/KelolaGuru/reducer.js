import * as actionTypes from './actionTypes';

const initialState = {
  dataGuru: [],
  detailGuru: {},
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_GURU:
      return {
        ...state,
        dataGuru: data,
      }
    case actionTypes.GET_DETAIL_DATA_GURU:
      return {
        ...state,
        detailGuru: data,
      }
    default:
      return state;
  }
}

export default reducer;