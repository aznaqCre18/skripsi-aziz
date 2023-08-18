import * as actionTypes from './actionTypes';
import fetch from './../../../utils/fetch';
import AuthService from './../../../utils/authService';
import { toast } from 'react-toastify';
import { SERVICES } from '../../../configs/services';

const Auth = new AuthService();

export const getDataWaktuMengajar = () => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: SERVICES.GET_WAKTU_MENGAJAR,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      }
    }

    fetch(option).then((res => {
        dispatch(getDataWaktuMengajarToReducer(res.data));
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

export const addDataWaktuMengajar = (payload) => {
  return (dispatch) => {
    const option = {
      method: 'POST',
      url: SERVICES.ADD_WAKTU_MENGAJAR,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
      data: payload,
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
    })
  }
}

export const editDataWaktuMengajar = (id, payload) => {
  return (dispatch) => {
    const option = {
      method: 'PUT',
      url: `${SERVICES.EDIT_WAKTU_MENGAJAR}/${id}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
      data: payload,
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
    })
  }
}

export const deleteDataWaktuMengajar = (id) => {
  return (dispatch) => {
    const option = {
      method: 'DELETE',
      url: `${SERVICES.DELETE_WAKTU_MENGAJAR}/${id}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
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
    })
  }
}

function getDataWaktuMengajarToReducer(data) {
  return {
    type: actionTypes.GET_WAKTU_MENGAJAR,
    data,
  }
}