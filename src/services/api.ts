import Axios from 'axios'
import { toast } from 'react-toastify';
import { authRequestIntercept, authResponseIntercept } from './interceptors';

const api = Axios.create({
  baseURL: 'http://localhost:3001'
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
    window.location  = window.location.protocol + "//" + window.location.host + "/auth/sign-in" as any
  }

  throw error
}


export default api;