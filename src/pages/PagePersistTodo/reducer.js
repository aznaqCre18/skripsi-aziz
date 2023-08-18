import * as actionTypes from './actionTypes';

const initialState = {
    todo: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TODO_LIST:
            return {
                ...state,
                todo: [...state.todo, action.data]
            }
        default:
            return state;
    }
}

export default reducer;