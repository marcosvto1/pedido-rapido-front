import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './style.css'

const logo =  require("../../assets/logo.png")


const SignInPage = () => {

  let navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = () => {
    const result = auth.signIn({
      email: "mail.com",
      password: ""
    });

    navigate('m')
  }


  return <div className="login">
    <figure>
          <img src={logo} alt="" width={200}/>
    </figure>
    <div className="flex justify-center items-center p-2">
 
      <div className="card w-100 bg-base-100 shadow-xl">
   
        <div className="card-body">
          <div>
            <label>E-mail</label>
            <input type="text" placeholder="E-mail" className="input w-full max-w-xs" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Senha" className="input w-full max-w-xs" />
          </div>
          <div className="justify-center card-actions w-full mt-2">
            <button className="btn btn-block btn-primary">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default SignInPage;