import Axios from 'axios'
import { toast } from 'react-toastify';
import history from './history';
import { authRequestIntercept, authResponseIntercept } from './interceptors';

const api = Axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.response.use(authResponseIntercept, handleResponseError)
api.interceptors.request.use(authRequestIntercept)

function handleResponseError(error: any) {
  console.log(error);
  if (error.response) {
    authResponseIntercept(error.response)
    const data = error.response.data;

    if (data && data.error && data.errors.fields) {
      const errors = data.errors as any;
      const fieldsName = Object.keys(errors.fields)
      fieldsName.forEach((err) => {
        toast.error(err + ':' + errors.fields[error].join(', '))
      })
      console.log('errors', errors)
    }
  }

  if (error.response && ([401, 403].includes(error.response.status))) {
    //window.location  = window.location.protocol + "//" + window.location.host + "/" as any
    history.replace("/auth/sign_in"); // <-- navigate.
  }

  throw error
}


export default api;