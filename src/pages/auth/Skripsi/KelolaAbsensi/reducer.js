import * as actionTypes from './actionTypes';

const initialState = {
  dataAbsensi: [],
//   dataUserEdit: {
//     name: '',
//     username: '',
//   }
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_DATA_ABSENSI:
      return {
        ...state,
        dataAbsensi: data,
      }
    default:
      return state;
  }
}

export default reducer;