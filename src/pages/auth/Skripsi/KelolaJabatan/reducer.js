import * as actionTypes from './actionTypes';

const initialState = {
  dataJabatan: [],
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_JABATAN:
      return {
        ...state,
        dataJabatan: data,
      }
    default:
      return state;
  }
}

export default reducer;