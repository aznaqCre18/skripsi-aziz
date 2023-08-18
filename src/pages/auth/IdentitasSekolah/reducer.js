import * as actionTypes from './actionTypes';

const initialState = {
    dataIdentitas: {},
};

const reducer = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {
        case actionTypes.GET_IDENTITAS_SEKOLAH:
            return {
                ...state,
                dataIdentitas: data,
            }
        default:
            return state;
    }
}

export default reducer;