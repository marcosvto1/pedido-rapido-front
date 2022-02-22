import { useNavigate } from "react-router-dom";
import { OrderStatus, useOrder } from '../../../contexts/OrderContext';
import './style.css'

import { useEffect, useState } from "react";
import { TableService } from "../../../services/tables";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../contexts/AuthContext";

const TablePage = () => {
  const navigate = useNavigate();
  const app = useOrder();
  const [tables, setTables] = useState<any[]>([])
  const auth = useAuth();

  const fetchData = async () => {
    const result = await TableService.index();
    if (result.tables) {
      setTables(result.tables);
    }
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => fetchData(), 4000)
    return () => clearInterval(intervalId);
  }, [app.tables])

  const handleSignOut = async () => {
    const signOutSuccess = await auth.signOut();
    if (signOutSuccess) {
      navigate('/auth/sign_in');
    }
  }

  const handlerTable = (table: number) => {
    const tableSelected = tables.find((item) => item.table === table);
    if (tableSelected) {
      const tableUpdated = {
        ...tableSelected, order: tableSelected.order === null ? {
          items: [],
          status: OrderStatus.AVAILABLE,
          id: undefined,
          observation: ''
        } : tableSelected.order
      };
      app.updateTable(tableUpdated);
    }
    navigate(`/app/${table}/menu`);
  }

  function renderTableItem(key: number, status: 'in_use' | 'available') {
    if (status === 'available') {
      return <div key={key} onClick={() => handlerTable(key)} className="item-table border-2 border-primary-focus text-primary cursor-pointer">{key}</div>
    }
    return <div key={key} onClick={() => handlerTable(key)} className="item-table bg-primary text-black cursor-pointer">{key}</div>
  }

  function renderHeader() {
    return <div className=' flex flex-row justify-between p-2'>
      <h1 className="text-3xl font-bold mr-8 mt-6">Mesas</h1>
      <button className="btn" onClick={handleSignOut}>
        <FontAwesomeIcon icon={faSignOut} size={'1x'} />
      </button>
    </div>
  }

  return (
    <div className='flex flex-col p-2 lg:p-8'>
      {renderHeader()}

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-4 ">
        {tables.map((item) => {
          return renderTableItem(item.table, item.status)
        })}
      </div>
    </div>
  )
}

export default TablePage;