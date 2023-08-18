import * as actionTypes from './actionTypes';

const intialState = {
    dataJurusan: [],
}

const reducer = (state = intialState, action) => {
    console.log(action.data, "ACTION");
    switch (action.type) {
        case actionTypes.GET_DATA_JURUSAN:
            return {
                ...state,
                dataJurusan: action.data,
            }
        default:
            return state;
    }
}

export default reducer;