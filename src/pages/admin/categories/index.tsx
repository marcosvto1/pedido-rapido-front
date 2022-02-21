import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryService } from "../../../services/category";

type CategoriesStateType = {
  id: number;
  title: string;
  image_url: string;
  status: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoriesStateType[]>([])
  const [query, setQuery] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await CategoryService.admin.index(query);
      if (result.categories) {
        setCategories(result.categories)
      }
    }
    fetchData();
  }, [query])

  const handlerQuery = async (e: any) => {
      await (new Promise((resolve, reject) => setTimeout(resolve, 500)))
      setQuery(e.target.value)
  }

  function renderStatus(status?: number | string) {
    console.log(status);
    if (status === undefined || status === null) {
      return <div className="badge badge-primary">Ativo</div>;
    }
    if (status === 1) {
      return <div className="badge badge-primary">Ativo</div>;
    }
    return <div className="badge badge-info">Inativo</div>;
  }

  return (<>
    <h1 className="text-lg text-white font-bold">Gestão de Categorias</h1>
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
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map((e) => {
              return <tr key={e.id}>
                <th>
                  <div className="avatar">
                    <div className="w-24 mask mask-squircle">
                      <img src={e.image_url} alt="categoria" />
                    </div>
                  </div>
                </th>
                <td>{e.title}</td>
                <td>{renderStatus(e.status)}</td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/admin/categories/${e.id}/edit`} className="btn btn-sm">
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

export default CategoriesPage;