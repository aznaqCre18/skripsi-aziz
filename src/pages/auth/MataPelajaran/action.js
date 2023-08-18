import * as actionTypes from './actionTypes';
import fetch from './../../../utils/fetch';
import { SERVICES } from './../../../configs/services';
import AuthService from '../../../utils/authService';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getDataMapel = () => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: SERVICES.GET_MAPEL,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            console.log(res.data);
            dispatch(getDataMapelReducer(res.data));
        }).catch(err => {
            console.log(err);
        })
    }
}

export const addDataMapel = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.ADD_MAPEL,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: payload
        }

        fetch(option).then(res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}

export const editDataMapel = (id, payload) => {
    return (dispatch) => {
        const option = {
            method: 'PUT',
            url: `${SERVICES.EDIT_MAPEL}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: payload
        }

        console.log(option);

        fetch(option).then(res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}

export const deleteDataMapel = (id) => {
    return (dispatch) => {
        const option = {
            method: 'DELETE',
            url: `${SERVICES.DELETE_MAPEL}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
        }

        fetch(option).then(res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}

function getDataMapelReducer(data) {
    return {
        type: actionTypes.GET_MAPEL,
        data
    }
}