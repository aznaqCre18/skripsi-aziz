import * as actionTypes from './actionTypes';

const initialState = {
  dataSiswa: [],
};

const reducer = (state = initialState, action) => {
  const {type, data} = action;

  switch (type) {
    case actionTypes.GET_ALL_DATA_SISWA:
      return {
        ...state,
        dataSiswa: data,
      };
    default:
      return state;
  }
};

export default reducer;