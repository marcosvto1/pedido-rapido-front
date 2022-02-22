import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from 'formik'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ProductService } from "../../../../services/product";
import { CategoryService } from "../../../../services/category";
import DefaultPreviewImage from "../../../../components/Admin/shared/DefaultPreviewImage";
import CustomButton from "../../../../components/Admin/shared/LoadingButton";

type CategoriesStateType = {
  id?: number;
  title: string;
  status: any;
  image: any;
}
type ProductStateType = {
  id?: number;
  name: string;
  price: any;
  category_id: number;
  description: '',
  status: any;
  image: any;
}

const ProductFormPage = () => {
  let [initialValues, setInitialValues] = useState<ProductStateType>({
    name: '',
    price: null,
    description: '',
    category_id: 0,
    status: [],
    image: null
  });
  const [imagePreview, setImagePreview] = useState<ArrayBuffer | any>();

  let navigate = useNavigate();
  let params = useParams();

  const [categories, setCategories] = useState<CategoriesStateType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await CategoryService.admin.index();
      if (result.categories) {
        setCategories(result.categories)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        const result = await ProductService.show(params.id)
        if (result.product) {
          const product = result.product;
          setInitialValues({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            category_id: product.category.id,
            status: product.status === 1 ? ["on"]: [],
            image: null
          })
          setImagePreview(product.image_url)
        }
      }
    }
    fetchProduct();
  }, [params])


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const formData = new FormData();
    formData.set('product[name]', values.name)
    formData.set('product[status]', values.status[0] === 'on' ? "1" : "0")
    formData.set('product[price]', values.price)
    formData.set('product[category_id]', values.category_id)
    formData.set('product[time_to_prepare]', "0")
    formData.set('product[description]', values.description)
    if (values.image) {
      formData.set('product[image]', values.image)
    }

    try {
      if (params.id) {
        await ProductService.update(values.id, formData);
        toast.success('Produto atualizado com sucesso');
      } else {
        await ProductService.create(formData);
        toast.success('Produto criado  com sucesso');
      }

      navigate('/admin/products')
    } catch (error) {
      toast.error('Falha salvar registro')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFormValidates = (values: any) => {
    const errors: any = {}

    if (!values.name) {
      errors.name = "Campo Obrigatório"
    }
    if (!values.description) {
      errors.description = "Campo Obrigatório"
    }
    if (!values.price) {
      errors.price = "Campo Obrigatório"
    }
    if (!values.category_id) {
      errors.category_id = "Campo Obrigatório"
    }

    return errors;
  }

  return (<div>
    <h1 className="text-lg text-white">Cadastrar Produto</h1>
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
              <div className="flex flex-col  justify-center items-center p-2">
                <DefaultPreviewImage imageUrl={imagePreview}  />
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nome</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    defaultValue={values.name}
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="label text-red-300 text-sm">
                    {errors.name && touched.name && errors.name}
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Descrição</span>
                  </label>
                  <textarea 
                    name="description"
                    className="textarea h-24 textarea-bordered" 
                    placeholder="Descrição do Produto"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.description}
                  />
                  <label className="label text-red-300">
                    {errors.description && touched.description && errors.description}
                  </label>
                </div>

                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Perfil</span>
                  </label>
                  <select
                    name="category_id"
                    className="select select-bordered"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category_id}
                  >
                    <option disabled >Selecione</option>
                    {categories.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
                  </select>
                  <label className="label text-red-300 text-sm">
                    {errors.category_id && touched.category_id && errors.category_id}
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Preço do Produto</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    onChange={handleChange}
                    defaultValue={values.price}
                    className="input input-bordered w-full "
                    onBlur={handleBlur}
                  />
                  <label className="label text-red-300 text-sm">
                    {errors.price && touched.price && errors.price}
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
              <Link to="/admin/products/" className="btn">Cancelar</Link>
              <CustomButton loading={isSubmitting} disabled={isSubmitting}>Salvar</CustomButton>
            </div>
          </form>)}
      </Formik>
    </div>
  </div>)
}
export default ProductFormPage;