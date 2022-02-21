import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from 'formik'
import { EmployerService } from "../../../../services/employer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


type EmployersStateType = {
  id?: number;
  name: string;
  email: string;
  password: string,
  type_profile: string;
  status: any;
  password_confirmation: string
}

const EmployerFormPage = () => {
  let [initialValues, setInitialValues] = useState<EmployersStateType>({
    name: '',
    email: '',
    password: '',
    type_profile: '',
    password_confirmation: '',
    status: []
  });

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (params.id) {
        const result = await EmployerService.show(params.id)
        if (result.employee) {
          setInitialValues({...result.employee, status: result.employee.status === 1 ? ["on"] : []})
        }
      }
    }
    fetchEmployee();
  }, [params.id])


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const payload = {
      "employee": {
        name: values.name,
        email: values.email,
        password: values.password,
        type_profile: values.type_profile,
        status: values.status[0] === "on" ? 1 : 0
      }
    }
    try {
      if (params.id) {
        await EmployerService.update(values.id, payload);
        toast.success('Funcionário criado com sucesso');
      } else {
        await EmployerService.create(payload);
        toast.success('Funcionário criado com sucesso');
      }   
      navigate('/admin/employees', {
        replace: true
      })
    } catch (error) {
      toast.error('Falha ao registar funcionario')
    } finally  {
      setSubmitting(false)
    }
  }

  const handleFormValidates = (values: any) => {
    const errors: any = {}
    if (!values.email) {
      errors.email = "Campo Obrigatório"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "E-mail Inválido"
    }

    if (!values.name) {
      errors.name = "Campo Obrigatório"
    }

    if (params.edit) {

      
    }
    if (!values.password) {
      errors.password = "Campo Obrigatório"
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = "Campo Obrigatório"
    }

    if ((values.password && values.password_confirmation) && (values.password !== values.password_confirmation)) {
      errors.password_confirmation = 'Senhas não conferem'
    }


    if (!values.type_profile) {
      errors.type_profile = "Campo Obrigatório"
    }


    return errors;
  }

  return (<div>
    <h1 className="text-lg text-white font-bold">Cadastar Funcionário</h1>
    <div className="card bg-base-100 mt-4 p-4">
      <Formik
        initialValues={initialValues}
        validate={handleFormValidates}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                name="email"
                defaultValue={values.email || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="label text-red-300 text-sm">
                {errors.email && touched.email && errors.email}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nome</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                defaultValue={values.name}
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="label text-red-300 text-sm">
                {errors.name && touched.name && errors.name}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Senha</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Senha"
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="label text-red-300 text-sm">
                {errors.password && touched.password && errors.password}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirmação de Senha</span>
              </label>
              <input
                name="password_confirmation"
                type="password"
                placeholder="Senha"
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="label text-red-300 text-sm">
                {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Perfil</span>
              </label>
              <select
                name="type_profile"
                className="select select-bordered"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type_profile}
              >
                <option disabled >Selecione</option>
                <option value={'admin'}>Admin</option>
                <option value={'cook'}>Cozinheiro</option>
                <option value={'attendant'}>Atendente</option>
              </select>
              <label className="label text-red-300 text-sm">
                {errors.type_profile && touched.type_profile && errors.type_profile}
              </label>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Ativo</span>
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  name="status"
                  onChange={handleChange}
                  checked={!!values.status.length}
                  />
              </label>
              <label className="label text-red-300 text-sm">
                {errors.status && touched.status && errors.status}
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to="/admin/employees/" className="btn">Cancelar</Link>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>Salvar</button>
            </div>
          </form>)}
      </Formik>

    </div>
  </div>)
}
export default EmployerFormPage;