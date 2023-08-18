import * as actionTypes from './actionTypes';

const initialState = {
    dataJadwalMapel: [],
    dataJadwalSiswa: [],
    dataAbsensiSiswa: [],
}

const reducer = (state = initialState, action) => {
    const {type, data} = action;

    switch (type) {
        case actionTypes.GET_JADWAL_PELAJARAN_BY_ID_KELAS:
            return {
                ...state,
                dataJadwalMapel: data,
            };
        case actionTypes.GET_JADWAL_PELAJARAN_FOR_SISWA:
            return {
                ...state,
                dataJadwalSiswa: data,
            };
        case actionTypes.GET_ABSEN_FOR_SISWA:
            return {
                ...state,
                dataAbsensiSiswa: data,
            };
        default:
            return state;
    }
}

export default reducer;