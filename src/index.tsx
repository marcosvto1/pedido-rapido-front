import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



ReactDOM.render(
  <BrowserRouter>
    <div>
      <App />
      <ToastContainer autoClose={800} theme={'dark'} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);



serviceWorkerRegistration.unregister();
