import * as actionTypes from './actionTypes';

const initialState = {
  dataLaporanAbsensi: [],
  dataLaporanGaji: [],
}

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  
  switch (type) {
    case actionTypes.GET_DATA_ABSEN_LAPORAN:
      return {
        ...state,
        dataLaporanAbsensi: data,
      }
    case actionTypes.GET_DATA_GAJI_LAPORAN:
      return {
        ...state,
        dataLaporanGaji: data,
      }
    default:
      return state;
  }
}

export default reducer;