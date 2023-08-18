import * as actionTypes from './actionTypes';

const initialState = {
    dataGuru: [],
}

function reducer(state = initialState, action) {
    const { type, data } = action;

    switch (type) {
        case actionTypes.GET_DATA_GURU:
            return {
                ...state,
                dataGuru: data,
            }
        default:
            return state
    }
}

export default reducer;