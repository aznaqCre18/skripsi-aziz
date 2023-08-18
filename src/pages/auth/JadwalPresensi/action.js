import * as actionTypes from './actionTypes';
import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../configs/services';
import AuthService from '../../../utils/authService';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getJadwalMengajar = (id, hari) => {
    return (dispatch) => {
        const option = {
            method: 'GET',
            url: !hari ? `${SERVICES.GET_JADWAL_PELAJARAN_BY_ID_GURU}/${id}` : `${SERVICES.GET_JADWAL_PELAJARAN_BY_ID_GURU}/${id}?hari=${hari}`,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }

        fetch(option).then((res => {
            dispatch(jadwalMengajarToReducer(res.data));
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

function jadwalMengajarToReducer(data) {
    return {
        type: actionTypes.GET_DAFTAR_MENGAJAR,
        data,
    }
}