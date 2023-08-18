import * as actionTypes from './actionTypes';
import AuthService from '../../../../utils/authService';
import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../configs/services';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getDataGaji = () => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: SERVICES.GET_DATA_GAJI,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getDataGajiReducer(res.data));
        }).catch((err) => {
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

export const getDataGajiByIdGuru = (id) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_DATA_GAJI_BY_ID_GURU}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getDataGajiByIdGuruReducer(res.data));
        }).catch((err) => {
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

export const addDataGajiGuru = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.GET_DATA_GAJI,
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
        }).catch((err) => {
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

export const deleteDataGajiGuru = (id) => {
    return (dispatch) => {
        const option = {
            method: 'DELETE',
            url: `${SERVICES.GET_DATA_GAJI}/${id}`,
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
        }).catch((err) => {
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

function getDataGajiReducer(data) {
    return {
        type: actionTypes.GET_DATA_GAJI,
        data
    }
}

function getDataGajiByIdGuruReducer(data) {
    return {
        type: actionTypes.GET_DATA_GAJI_BY_ID_GURU,
        data,
    }
}