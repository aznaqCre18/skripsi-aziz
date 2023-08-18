import * as actionTypes from './actionTypes';

const initialState = {
  dataTahunAjaran: []
};

const reducer = (state = initialState, action) => {
  const { data, type } = action;
  switch (type) {
    case actionTypes.GET_TAHUN_AJARAN:
      return {
        ...state,
        dataTahunAjaran: data,
      };
    default:
      return state;
  }
};

export default reducer;