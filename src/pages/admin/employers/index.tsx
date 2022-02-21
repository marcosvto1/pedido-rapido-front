import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployerService } from "../../../services/employer";

type EmployersStateType = {
  id: number;
  name: string;
  email: string;
  type_profile: string;
  status: string;
}

const EmployersPage = () => {
  const [employees, setEmployees] = useState<EmployersStateType[]>([])
  const [query, setQuery] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const result = await EmployerService.index(query);
      if (result.employees) {
        setEmployees(result.employees)
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


  return (<>
    <h1 className="text-lg text-white font-bold">Gestão de Funcionarios</h1>
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
              <th>Email</th>
              <th>Status</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 && employees.map((e) => {
              return <tr key={e.id}>
                <th>{e.id}</th>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{renderStatus(e.status)}</td>
                <td>{e.type_profile}</td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/admin/employees/${e.id}/edit`} className="btn btn-sm">
                      <FontAwesomeIcon icon={faUserEdit} />
                    </Link>
                    {/* <button className="btn btn-sm">
                      <FontAwesomeIcon icon={faTrash} />
                    </button> */}
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

export default EmployersPage;