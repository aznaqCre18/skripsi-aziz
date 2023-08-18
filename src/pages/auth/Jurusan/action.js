import * as actionTypes from './actionTypes';
import fetch from './../../../utils/fetch';
import { SERVICES } from '../../../configs/services';
import authService from './../../../utils/authService';
import { toast } from 'react-toastify';

const Auth = new authService();

export const getDataJurusan = () => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: SERVICES.GET_JURUSAN,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res => {
            dispatch(dataJurusanToReducer(res.data));
        })).catch(err => {
            console.log(err);
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

export const addDataJurusan = (payload) => {
    return((dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.ADD_JURUSAN,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: payload,
        }

        fetch(option).then((res) => {
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
    })
}

export const editDataJurusan = (id, payload) => {
    return (dispatch) => {
        const option = {
            method: 'PUT',
            url: `${SERVICES.EDIT_JURUSAN}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: payload,
        }

        fetch(option).then((res) => {
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

export const deleteDataJurusan = (id) => {
    return (dispatch) => {
        const option = {
            method: 'DELETE',
            url: `${SERVICES.DELETE_JURUSAN}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res) => {
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

function dataJurusanToReducer(data) {
    return {
        type: actionTypes.GET_DATA_JURUSAN,
        data
    }
}