import * as actionTypes from './actionTypes';

const initialState = {
    dataMengajar: []
};

const reducer = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {
        case actionTypes.GET_DAFTAR_MENGAJAR:
            return {
                ...state,
                dataMengajar: data,
            }
        default:
            return state
    }
}

export default reducer;