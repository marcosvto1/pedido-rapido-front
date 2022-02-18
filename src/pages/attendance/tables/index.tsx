import { useNavigate } from "react-router-dom";
import { useOrder } from '../../../contexts/OrderContext';
import './style.css'

import Logo from '../../../assets/logo.png';

const TablePage = () => {

  const navigate = useNavigate();
  const app = useOrder();

  const handlerTable = (table: number) => {
    navigate(`/app/${table}/menu`);
  }

  const RenderTable = (key: number, status: 'in_use' | 'available') => {
    if (status === 'available') {
      return <div key={key} onClick={() => handlerTable(key)} className="item-table border-2 border-primary-focus text-primary">{key}</div>
    }
    return <div key={key} onClick={() => handlerTable(key)} className="item-table bg-primary text-black">{key}</div>

  }

  return (
    <div className='flex flex-col  '>
      <div className=' flex flex-row justify-center p-2'>
        <img src={Logo} alt="Logo" width={150} height={100} />
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-4 ">
        {app.tables.map((item) => {
          return RenderTable(item.table, item.status)
        })}
      </div>
    </div>
  )
}

export default TablePage;