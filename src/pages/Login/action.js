import { SERVICES } from '../../configs/services';
import fetch from '../../utils/fetch';
import AuthService from '../../utils/authService';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken'

const Auth = new AuthService();

export function login(payload) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: SERVICES.LOGIN,
      data: payload
    }
    
    fetch(options).then((res => {
      
      if(res.status) {
        
        const dataUserLogin = jwt.decode(res.data.user.token);

        Auth.setToken(res.data.user.token);
        Auth.setProfile(dataUserLogin);

        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        window.location.replace('/');

      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })).catch(err => {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    })
  }
}