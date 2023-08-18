import * as actionTypes from './actionTypes';
import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../configs/services';
import AuthService from '../../../utils/authService';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getIdentitasSekolah = (id) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: `${SERVICES.GET_IDENTITAS_SEKOLAH}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
        }

        fetch(option).then((res) => {
            dispatch(getIdentitasSekolahToReducer(res.data));
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

export const createIdentitasSekolah = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.CREATE_IDENTITAS_SEKOLAH,
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

export const editIdentitasSekolah = (id, payload) => {
    return (dispatch) => {
        const option = {
            method: 'PUT',
            url: `${SERVICES.UPDATE_IDENTITAS_SEKOLAH}/${id}`,
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

function getIdentitasSekolahToReducer(data) {
    return {
        type: actionTypes.GET_IDENTITAS_SEKOLAH,
        data
    }
}