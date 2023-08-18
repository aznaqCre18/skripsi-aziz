import * as actionTypes from './actionTypes';
import fetch from "../../../utils/fetch";
import { SERVICES } from '../../../configs/services';
import { toast } from 'react-toastify';
import AuthService from '../../../utils/authService';

const Auth = new AuthService();

export const getDataTahunAjaran = () => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: SERVICES.GET_TAHUN_AJARAN,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      }
    }

    fetch(option).then((res) => {
        dispatch(getDataTAReducer(res.data));
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
};

export const addDataTahunAjaran = (payload) => {
  return (dispatch) => {
    const option = {
      method: 'POST',
      url: SERVICES.ADD_TAHUN_AJARAN,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
      data: payload,
    };

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
    });
  }
}

export const deleteDataTahunAjaran = (id) => {
  return (dispatch) => {
    const option = {
      method: 'DELETE',
      url: `${SERVICES.DELETE_TAHUN_AJARAN}/${id}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
    };

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
    });
  }
}

function getDataTAReducer(data) {
  return {
    type: actionTypes.GET_TAHUN_AJARAN,
    data,
  }
}