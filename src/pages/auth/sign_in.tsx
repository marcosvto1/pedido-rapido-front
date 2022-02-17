import { useAuth } from "../../contexts/AuthContext";

const SignInPage = () => {
  const auth = useAuth();

  const handleLogin = () => {
    const result = auth.signIn({
      email: "mail.com",
      password: ""
    });
  }


  return <div className="flex justify-center items-center max-h-full">
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <h1>GreenFood</h1>
      </figure>
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
}
export default SignInPage;