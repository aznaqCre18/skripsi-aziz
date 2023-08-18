import * as actionTypes from './actionTypes';
import AuthService from '../../../../utils/authService';
import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../configs/services';
import { toast } from 'react-toastify';

const Auth = new AuthService();

export const getDataDashboard = () => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: SERVICES.GET_DATA_DASHBOARD,
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
    }
    }

    fetch(option).then(res => {
      dispatch(getDataDashboardToReducer(res.data));
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
}

function getDataDashboardToReducer(data) {
  return {
    type: actionTypes.GET_DATA_DASHBOARD,
    data
  }
}