import * as actionTypes from './actionTypes';
import { SERVICES } from '../../../configs/services';
import fetch from '../../../utils/fetch';
import { toast } from 'react-toastify';
import AuthService from '../../../utils/authService';

const Auth = new AuthService();

export const getDataAbsensiForSiswa = (idSiswa, idMapel) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_ALL_ABSEN_FOR_SISWA}?idSiswa=${idSiswa}&idMapel=${idMapel}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getAbsensiForSiswaToReducer(res));
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

export const getDataJadwalMapelForSiswa = (id) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_ALL_JADWAL_PELAJARAN}?idKelas=${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getDataJadwalMapelForSiswaToReducer(res.data));
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

export const getJadwalPelajaranByIdKelas = (id) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_JADWAL_PELAJARAN_BY_ID_KELAS}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getDataJadwalMapelByIdKelasToReducer(res.data));
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

export const addJadwalPelajaran = (payload) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: `${SERVICES.ADD_JADWAL_PELAJARAN}`,
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

export const editJadwalMapel = (id, payload) => {
    return (dispatch) => {
        const option = {
            method: 'PATCH',
            url: `${SERVICES.EDIT_JADWAL_PELAJARAN}/${id}`,
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

function getDataJadwalMapelByIdKelasToReducer(data) {
    return {
        type: actionTypes.GET_JADWAL_PELAJARAN_BY_ID_KELAS,
        data,
    }
}

function getDataJadwalMapelForSiswaToReducer(data) {
    return {
        type: actionTypes.GET_JADWAL_PELAJARAN_FOR_SISWA,
        data,
    }
}

function getAbsensiForSiswaToReducer(data) {
    return {
        type: actionTypes.GET_ABSEN_FOR_SISWA,
        data,
    }
}