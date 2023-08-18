import * as actionTypes from './actionTypes';
import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../configs/services';
import AuthService from '../../../utils/authService';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getAllAbsensi = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_ALL_ABSENSI_SISWA}?idMapel=${payload.idMapel}&idPertemuan=${payload.idPertemuan}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res => {
            dispatch(allAbsensiByIdMapelIDPertemuanToReducer(res.data));
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

export const getAllPertemuanByIdMapel = (idMapel) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_ALL_PERTEMUAN_BY_ID_MAPEL}/${idMapel}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res => {
            dispatch(allPertemuanByIdMapelToReducer(res.data));
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

export const getPertemuanByIdJadwal = (id) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_PERTEMUAN_BY_ID_JADWAL}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res => {
            dispatch(pertemuanToReducer(res.data));
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

export const addPertemuanByIdJadwal = (data) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: `${SERVICES.ADD_PERTEMUAN}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data
        }

        fetch(option).then((res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

export const getDataAbsensiByIdPertemuan = (id) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_ABSENSI_SISWA_BY_PERTEMUAN}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res => {
            dispatch(absensiToReducer(res.data));
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

export const addAbsensiSiswa = (data) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: `${SERVICES.ADD_ABSENSI_SISWA}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data
        }

        fetch(option).then((res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

export const editAbsensiSiswa = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'PATCH',
            url: `${SERVICES.EDIT_ABSENSI_SISWA}/${payload.id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: {status: payload.status}
        }

        fetch(option).then((res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })).catch(err => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
}

function allPertemuanToReducer(data) {
    return {
        type: actionTypes.GET_ALL_DATA_PERTEMUAN,
        data,
    }
}
function pertemuanToReducer(data) {
    return {
        type: actionTypes.GET_DATA_PERTEMUAN,
        data,
    }
}

function absensiToReducer(data) {
    return {
        type: actionTypes.GET_DATA_ABSENSI,
        data,
    }
}

function allPertemuanByIdMapelToReducer(data) {
    return {
        type: actionTypes.GET_ALL_DATA_PERTEMUAN_BY_ID_MAPEL,
        data,
    }
}

function allAbsensiByIdMapelIDPertemuanToReducer(data) {
    return {
        type: actionTypes.GET_DATA_ABSENSI_BY_MAPEL_PERTEMUAN,
        data
    }
}