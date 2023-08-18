import * as actionTypes from './actionTypes';

export const addTodoList = (data) => {
    return (dispatch) => {
        dispatch(reducerAddTodoList(data));
    }
}

function reducerAddTodoList(data) {
    return {
        type: actionTypes.SET_TODO_LIST,
        data
    }
}