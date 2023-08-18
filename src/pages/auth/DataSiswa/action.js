import * as actionTypes from './actionTypes';
import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../configs/services';
import AuthService from '../../../utils/authService';
import { toast } from 'react-toastify';
import qs from 'query-string';

const Auth = new AuthService();

export const getDataSiswa = (payload) => {
  const queryParams = qs.stringify(payload);
  console.log(queryParams, "<< Qs");

  return (dispatch) => {
    const option = {
      method: 'GET',
      url: payload ? `${SERVICES.GET_SISWA}?${queryParams}` : SERVICES.GET_SISWA,
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }

    fetch(option).then((res => {
      dispatch(dataSiswaReducer(res.data));
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
    });
  }
}

export const getDataSiswaByIdKelas = (id) => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: `${SERVICES.GET_SISWA_BY_ID_KELAS}/${id}`,
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }

    fetch(option).then((res => {
      dispatch(dataSiswaReducer(res.data));
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
    });
  }
}

export const addDataSiswa = (payload) => {
  return (dispatch) => {
    const option = {
      method: 'POST',
      url: SERVICES.ADD_SISWA,
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
    });
  }
}

export const editDataSiswa = (id, payload) => {
  return (dispatch) => {
    const option = {
      method: 'PUT',
      url: `${SERVICES.EDIT_SISWA}/${id}`,
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
    });
  }
}

export const deleteDataSiswa = (id) => {
  return (dispatch) => {
    const option = {
      method: 'DELETE',
      url: `${SERVICES.DELETE_SISWA}/${id}`,
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
    });
  }
}

function dataSiswaReducer(data) {
  return {
    type: actionTypes.GET_ALL_DATA_SISWA,
    data
  }
}