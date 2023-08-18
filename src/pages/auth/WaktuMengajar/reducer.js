import * as actionTypes from './actionTypes';

const initalState = {
  dataWaktuMengajar: [],
}

const reducer = (state = initalState, action) => {
  const { data, type } = action;

  switch (type) {
    case actionTypes.GET_WAKTU_MENGAJAR:
      return {
        ...state,
        dataWaktuMengajar: data,
      };
    default:
      return state;
  }
}

export default reducer;