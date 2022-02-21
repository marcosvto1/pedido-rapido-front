import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from 'formik'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CategoryService } from "../../../../services/category";


type CategoriesStateType = {
  id?: number;
  title: string;
  status: any;
  image: any;
}

const CategoryFormPage = () => {
  let [initialValues, setInitialValues] = useState<CategoriesStateType>({
    title: '',
    status: [],
    image: null
  });
  const [imagePreview, setImagePreview] = useState<ArrayBuffer | any>(); 

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      if (params.id) {
        const result = await CategoryService.admin.show(params.id)
        if (result.category) {
          setInitialValues({ id: result.category.id, title: result.category.title , status: result.category.status === 1 ? ["on"] : [], image: ""})
          setImagePreview(result.category.image_url)
        }
      }
    }
    fetchCategory();
  }, [params])


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const formData = new FormData();
    formData.set('category[title]', values.title)
    formData.set('category[status]', values.status[0] === 'on' ? "1" : "0")
    if (values.image) {
      formData.set('category[image]', values.image)
    }

    try {
      if (params.id) {
        await CategoryService.admin.update(values.id, formData);
        toast.success('Categoria atualizado com sucesso');
      } else {
        await CategoryService.admin.create(formData);
        toast.success('Categoria criado  com sucesso');
      }

      navigate('/admin/categories')
    } catch (error) {
      toast.error('Falha salvar registro')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFormValidates = (values: any) => {
    const errors: any = {}

    if (!values.title) {
      errors.title = "Campo Obrigatório"
    }

    return errors;
  }

  return (<div>
    <h1 className="text-lg text-white">Cadastrar Categorias</h1>
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
          isValid,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center flex-wrap">
              <div className="flex flex-col justify-center items-center p-2">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-xl">
                    <img src={imagePreview} alt="" />
                  </div>
                </div>
                <div className="form-control mb-2">
                  <input type="file" className="file" name="image" onChange={(e) => {
                    if (e.target.files) {
                      setFieldValue('image', e.target.files[0]);

                      const fileReader = new FileReader();
                      
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          setImagePreview(fileReader.result);
                        }
                      };

                      fileReader.readAsDataURL(e.target.files[0]);
                    }

                  }} />
                </div>

              </div>

              <div className="w-full">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Nome</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Nome"
                    defaultValue={values.title}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="label text-red-300 text-sm">
                    {errors.title && touched.title && errors.title}
                  </label>
                </div>

                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Ativo</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      name="status"
                      onClick={handleChange}
                      checked={!!values.status.length}
                       />
                  </label>
                  <label className="label text-red-300 text-sm">
                    {errors.status && touched.status && errors.status}
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to="/admin/categories/" className="btn">Cancelar</Link>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>Salvar</button>
            </div>
          </form>)}
      </Formik>

    </div>
  </div>)
}
export default CategoryFormPage;