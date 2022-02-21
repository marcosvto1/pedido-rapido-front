import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './style.css'
import { Formik } from 'formik';
import { toast } from "react-toastify";

const logo = require("../../assets/logo.png")


const SignInPage = () => {

  let navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any, { setSubmitting }: any) => {
    setLoading(true);
    try {
      const result: any = await auth.signIn({
        email: values.email,
        password: values.password
      });
      setLoading(false);
      setSubmitting(false);
      if (result) {
        switch (result) {
          case 'admin': {
            navigate('/admin')
            break;
          }
          case 'cook': {
            navigate('/app/kitchens')
            break;
          }
          case 'attendant': {
            navigate('/app/tables')
            break;
          }
        }
      }
    } catch (err) {
      toast.error('Credenciais de login inválidas. Tente novamente.')
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  return <div className="login">
    <figure >
      <img src={logo} alt="" width={200} className={loading ? 'animate-bounce' : ''} />
    </figure>
    {!loading &&
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={(values) => {
          let errors: any = {}
          if (!values.email) {
            errors.email = "Campo Obrigatório"
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "E-mail Inválido"
          }
          if (!values.password) {
            errors.password = 'Campo Obrigatório'
          }
          return errors
        }}
        onSubmit={handleLogin}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center p-2">
              <div className="card w-100 shadow-xl">
                <div className="card-body">
                  <div>
                    <label className="mb-2">E-mail</label>
                    <input type="text"
                      name="email"
                      placeholder="E-mail"
                      className="input w-full max-w-xs"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="label text-red-300 text-sm">
                      {errors.email && touched.email && errors.email}
                    </label>
                  </div>
                  <div className="mb-2 mt-2">
                    <label className="mb-2">Senha</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Senha"
                      className="input w-full max-w-xs"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="label text-red-300 text-sm">
                      {errors.password && touched.password && errors.password}
                    </label>
                  </div>
                  <div className="justify-center card-actions w-full mt-3">
                    <button className="btn btn-block btn-primary" disabled={!isValid || isSubmitting || values.password === ''} type="submit">Entrar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>

    }
  </div>
}
export default SignInPage;