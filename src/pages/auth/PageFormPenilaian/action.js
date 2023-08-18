import * as actionTypes from './actionTypes';
import fetch from "../../../utils/fetch";
import { SERVICES } from '../../../configs/services';
import { toast } from 'react-toastify';
import AuthService from '../../../utils/authService';

const Auth = new AuthService();

export const getNilaiAdmin = (payload) => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: `${SERVICES.GET_DATA_NILAI_ADMIN}?idKelas=${payload.idKelas}&idMapel=${payload.idMapel}&kategori=${payload.kategori}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
    }

    fetch(option).then((res) => {
       dispatch(getDataNilaiAdminToRed(res.data));
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

export const addDataNilai = (payload) => {
  return (dispatch) => {
    const option = {
      method: 'POST',
      url: `${SERVICES.ADD_DATA_NILAI}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
      data: payload
    }

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
    })
  }
}

export const editDataNilai = (payload, id) => {
  return (dispatch) => {
    const option = {
      method: 'PUT',
      url: `${SERVICES.EDIT_DATA_NILAI}/${id}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      },
      data: payload
    }

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
    })
  }
}

export const getDataNilaiByIdKelas = (id, idMapel, kategori) => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: `${SERVICES.GET_DATA_NILAI_BY_ID_KELAS}/${id}?idMapel=${idMapel}&kategori=${kategori}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      }
    }

    fetch(option).then((res) => {
        dispatch(getDataNilaiByIdToRed(res.data));
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

export const getDataNilaiByIdSiswa = (id, idMapel, kategori) => {
  return (dispatch) => {
    const option = {
      method: 'GET',
      url: kategori ? `${SERVICES.GET_DATA_NILAI_BY_ID_SISWA}/${id}?idMapel=${idMapel}&kategori=${kategori}` : `${SERVICES.GET_DATA_NILAI_BY_ID_SISWA}/${id}?idMapel=${idMapel}`,
      headers: {
          Authorization: `Bearer ${Auth.getToken()}`
      }
    }

    fetch(option).then((res) => {
        dispatch(getDataNilaiSiswaToRed(res.data));
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

function getDataNilaiByIdToRed(data) {
  return {
    type: actionTypes.GET_DATA_NILAI_BY_ID_KELAS,
    data
  }
}

function getDataNilaiAdminToRed(data) {
  return {
    type: actionTypes.GET_DATA_NILAI_ADMIN,
    data
  }
}

function getDataNilaiSiswaToRed(data) {
  return {
    type: actionTypes.GET_DATA_NILAI_SISWA,
    data
  }
}
