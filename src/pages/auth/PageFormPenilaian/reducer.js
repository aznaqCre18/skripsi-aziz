import * as actionTypes from './actionTypes';

const initialState = {
  dataNilai: [],
  dataNilaiAdmin: [],
  dataNilaiSiswa: [],
};

const reducer = (state = initialState, action) => {
  const { type,data } = action;

  switch (type) {
    case actionTypes.GET_DATA_NILAI_BY_ID_KELAS:
      return {
        ...state,
        dataNilai: data,
      };
    case actionTypes.GET_DATA_NILAI_ADMIN:
      return {
        ...state,
        dataNilaiAdmin: data,
      };
    case actionTypes.GET_DATA_NILAI_SISWA:
      return {
        ...state,
        dataNilaiSiswa: data,
      };
    default:
      return state;
  }
};

export default reducer;