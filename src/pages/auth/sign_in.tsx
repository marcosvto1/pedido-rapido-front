import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './style.css'

const logo =  require("../../assets/logo.png")


const SignInPage = () => {

  let navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    auth.signIn({
      email: "mail.com",
      password: ""
    });
    (async () => {
      await ( new Promise((resolve, reject) => {
        setTimeout(resolve, 5000)
      }));
      navigate('/app/tables')
    })();
   

    
  }


  return <div className="login">
    <figure >
          <img src={logo} alt="" width={200} className={loading ? 'animate-bounce': ''} />
    </figure>
    { !loading &&
      <div className="flex justify-center items-center p-2">
  
        <div className="card w-100 shadow-xl">   
          <div className="card-body">
            <div>
              <label className="mb-2">E-mail</label>
              <input type="text" placeholder="E-mail" className="input w-full max-w-xs" />
            </div>
            <div className="mb-2 mt-2">
              <label className="mb-2">Senha</label>
              <input type="password" placeholder="Senha" className="input w-full max-w-xs" />
            </div>
            <div className="justify-center card-actions w-full mt-3">
              <button className="btn btn-block btn-primary" onClick={handleLogin}>Entrar</button>
            </div>
          </div>
        </div>
      </div> 
    }
  </div>
}
export default SignInPage;