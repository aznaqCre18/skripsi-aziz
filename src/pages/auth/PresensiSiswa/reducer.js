import * as actionTypes from './actionTypes';

const initialState = {
    dataPertemuan: [],
    dataPertemuanIdMapel: [],
    dataAbsensi: [],
    dataAbsensiAll: [],
};

const reducer = (state = initialState, action) => {
    const { data, type } = action;

    switch (type) {
        case actionTypes.GET_DATA_PERTEMUAN:
            return {
                ...state,
                dataPertemuan: data
            };
        case actionTypes.GET_DATA_ABSENSI:
            return {
                ...state,
                dataAbsensi: data
            }
        case actionTypes.GET_DATA_ABSENSI_BY_MAPEL_PERTEMUAN:
            return {
                ...state,
                dataAbsensiAll: data
            }
        case actionTypes.GET_ALL_DATA_PERTEMUAN_BY_ID_MAPEL:
            return {
                ...state,
                dataPertemuanIdMapel: data
            }
        default:
            return state;
    }
}

export default reducer;