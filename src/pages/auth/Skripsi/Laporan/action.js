import * as actionTypes from './actionTypes';
import AuthService from '../../../../utils/authService';
import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../configs/services';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getDataLaporanAbsensi = (query) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_DATA_ABSEN_LAPORAN}?startDate=${query.startDate}&endDate=${query.endDate}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getAllDataAbsenByDateRangeToReducer(res.data));
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

export const getDataLaporanGaji = (query) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: `${SERVICES.GET_DATA_GAJI_LAPORAN}?bulan=${query}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then(res => {
            dispatch(getAllDataGajiByBulanToReducer(res.data));
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

function getAllDataAbsenByDateRangeToReducer(data) {
    return {
        type: actionTypes.GET_DATA_ABSEN_LAPORAN,
        data,
    }
}

function getAllDataGajiByBulanToReducer(data) {
    return {
        type: actionTypes.GET_DATA_GAJI_LAPORAN,
        data,
    }
}