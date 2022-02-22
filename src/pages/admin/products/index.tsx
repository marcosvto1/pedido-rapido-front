import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultPreviewImage from "../../../components/Admin/shared/DefaultPreviewImage";
import { ProductService } from "../../../services/product";

type ProductsStateType = {
  id: number;
  name: string;
  price: string;
  image_url: string;
  status: string;
  category: any
}

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductsStateType[]>([])
  const [query, setQuery] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.index(query);
      if (result.products) {
        setProducts(result.products)
      }
    }
    fetchData();
  }, [query])

  const handlerQuery = async (e: any) => {
      await (new Promise((resolve, reject) => setTimeout(resolve, 500)))
      setQuery(e.target.value)
  }

  function renderStatus(status?: number | string) {
    if (status === undefined || status === null) {
      return <div className="badge badge-primary">Ativo</div>;
    }
    if (status === 1) {
      return <div className="badge badge-primary">Ativo</div>;
    }
    return <div className="badge badge-info">Inativo</div>;
  }

  function formatCurrent(number: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
  }

  return (<>
    <h1 className="text-lg text-white font-bold">Gestão de Produtos</h1>
    <div className="flex flex-col mt-4">
      <div className="flex flex-row justify-between">
        <input type="text" placeholder="Buscar por nome" onChange={(e) => handlerQuery(e)} className="input input-bordered w-full max-w-xs" />
        <Link to="new" className="btn btn-primary">
          Novo
        </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          <thead>
            <tr className="text-white">
              <th></th>
              <th>Name</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 && products.map((e) => {
              return <tr key={e.id}>
                <th>
                  <div className="avatar">
                    <div className="w-24 mask mask-squircle">
                      <DefaultPreviewImage imageUrl={e.image_url} />
                    </div>
                  </div>
                </th>
                <td><span className="font-semibold">{e.name} </span>/ <span className="text-sm text-green-200">{e.category.title}</span></td>
                <td>{formatCurrent(Number(e.price))}</td>
                <td>{renderStatus(e.status)}</td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/admin/products/${e.id}/edit`} className="btn btn-sm">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </div>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>)
}

export default ProductsPage;