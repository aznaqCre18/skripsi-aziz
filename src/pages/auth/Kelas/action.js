import * as actionTypes from './actionTypes';
import fetch from '../../../utils/fetch';
import AuthService from '../../../utils/authService';
import { SERVICES } from '../../../configs/services';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getDataKelas = () => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: SERVICES.GET_KELAS,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res) => {
            dispatch(getDataKelasReducer(res.data));
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

export const createDataKelas = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.ADD_KELAS,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
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

export const editDataKelas = (id, payload) => {
    return (dispatch) => {
        const option = {
            method: 'PUT',
            url: `${SERVICES.EDIT_KELAS}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
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

export const deleteKelas = (id) => {
    return (dispatch) => {
        const option = {
            method: 'DELETE',
            url: `${SERVICES.DELETE_KELAS}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        };

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

function getDataKelasReducer(data) {
    return {
        type: actionTypes.GET_KELAS,
        data
    }
}