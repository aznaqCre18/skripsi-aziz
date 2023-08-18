import * as actionTypes from './actionTypes';
import AuthService from '../../../../utils/authService';
import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../configs/services';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getDataMapel = () => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: SERVICES.GET_DATA_MAPEL,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getAllDataMapelReducer(res.data));
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

export const addDataJadwalMapel = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.GET_DATA_MAPEL,
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

export const editDataJadwalMapel = (id, payload) => {
    return (dispatch) => {
        const option = {
            method: 'PUT',
            url: `${SERVICES.GET_DATA_MAPEL}/${id}`,
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

export const deleteJadwalMapel = (id) => {
    return (dispatch) => {
        const option = {
            method: 'DELETE',
            url: `${SERVICES.GET_DATA_MAPEL}/${id}`,
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

function getAllDataMapelReducer(data) {
    return {
        type: actionTypes.GET_DATA_MAPEL,
        data
    }
}