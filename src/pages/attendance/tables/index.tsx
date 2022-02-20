import { useNavigate } from "react-router-dom";
import { OrderStatus, useOrder } from '../../../contexts/OrderContext';
import './style.css'

import Logo from '../../../assets/logo.png';
import { useEffect, useState } from "react";
import { TableService } from "../../../services/tables";

const TablePage = () => {

  const navigate = useNavigate();
  const app = useOrder();
  const [tables, setTables] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)


  const fetchData = async () => {
    setLoading(true);
    const result = await TableService.index();
    if (result.tables) {
      setTables(result.tables);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => fetchData(), 4000)
    return () => clearInterval(intervalId);
  }, [app.tables])

  const handlerTable = (table: number) => {
    console.log('mesas', tables);
    console.log('mesa selecionada',table)
    const tableSelected = tables.find((item) => item.table === table);
    if (tableSelected) {
      console.log('entrou aqui');
      const tableUpdated = {
        ...tableSelected, order: tableSelected.order === null ? {
          items: [],
          status: OrderStatus.AVAILABLE,
          id: undefined,
          observation: ''
        } : tableSelected.order
      };
      console.log(tableUpdated);
      app.updateTable(tableUpdated);
    }
    navigate(`/app/${table}/menu`);
  }

  const RenderTable = (key: number, status: 'in_use' | 'available') => {
    if (status === 'available') {
      return <div key={key} onClick={() => handlerTable(key)} className="item-table border-2 border-primary-focus text-primary">{key}</div>
    }
    return <div key={key} onClick={() => handlerTable(key)} className="item-table bg-primary text-black">{key}</div>
  }

  return (
    <div className='flex flex-col'>
      {
        loading ? <div className=' flex flex-row justify-center p-2'>
          <img src={Logo} alt="Logo" width={150} height={100} className="animate-ping" />
        </div>
          : <div className=' flex flex-row justify-center p-2'>
            <img src={Logo} alt="Logo" width={150} height={100} />
          </div>
      }

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-4 ">
        {tables.map((item) => {
          return RenderTable(item.table, item.status)
        })}
      </div>
    </div>
  )
}

export default TablePage;