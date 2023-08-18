import * as actionTypes from './actionTypes';

const initialState = {
    dataKelas: [],
};

const reducer = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {
        case actionTypes.GET_KELAS:
            return {
                ...state,
                dataKelas: data
            };
        default:
            return state;
    }
}

export default reducer;