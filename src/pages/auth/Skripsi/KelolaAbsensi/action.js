import { SERVICES } from '../../../../configs/services';
import * as actionTypes from './actionTypes';
import AuthService from '../../../../utils/authService';
import fetch from '../../../../utils/fetch';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getAllDataAbsen = (search) => {
    return (dispacth) => {
        const option = {
            method: 'GET',
            url: search ? `${SERVICES.GET_DATA_ABSENSI}?search=${search}` : SERVICES.GET_DATA_ABSENSI,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        };

        fetch(option)
            .then(res => {
                dispacth(getAllDataAbsenToReducer(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const getAllDataAbsenByDateRangeAndIdGuru = (payload) => {
    return (dispacth) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_DATA_ABSENSI_BY_DATE_RANGE}?idGuru=${payload.idGuru}&startDate=${payload.startDate}&endDate=${payload.endDate}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        };

        fetch(option)
            .then(res => {
                dispacth(getAllDataAbsenToReducer(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const addDataAbsen = (data) => {
    return (dispatch) => {
        const option = {
            method: 'POST',
            url: SERVICES.GET_DATA_ABSENSI,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: {
                id_mapel: data.id_mapel,
                id_guru: data.id_guru,
                status: data.status,
                tanggal: data.tanggal
            },
        };

        fetch(option)
            .then(res => {
                toast.success('Absensi berhasil ditambahkan', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => {
                toast.error('Absensi gagal ditambahkan', {
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

export const editDataAbsen = (data) => {
    return (dispatch) => {
        const option = {
            method: 'PUT',
            url: `${SERVICES.GET_DATA_ABSENSI}/${data.id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
            data: {
                id_mapel: data.id_mapel,
                id_guru: data.id_guru,
                status: data.status,
                tanggal: data.tanggal
            },
        };

        fetch(option)
            .then(res => {
                toast.success('Absensi berhasil diedit', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => {
                toast.error('Absensi gagal diedit', {
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

export const deleteDataAbsen = (id) => {
    return (dispatch) => {
        const option = {
            method: 'DELETE',
            url: `${SERVICES.GET_DATA_ABSENSI}/${id}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            },
        };

        fetch(option)
            .then(res => {
                toast.success('Absensi berhasil dihapus', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => {
                toast.error('Absensi gagal dihapus', {
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

function getAllDataAbsenToReducer(data) {
    return {
        type: actionTypes.GET_DATA_DATA_ABSENSI,
        data,
    }
}