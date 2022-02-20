import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import { OrderStatus, useOrder } from '../../../contexts/OrderContext';
import { useEffect, useState } from 'react';

const MenuHeader = (props: any) => {

  const order = useOrder();
  const [zIndexHabilit, setZIndexHabilit] = useState(false);

  function renderButtonPrevious() {
    return <button onClick={props.onPreviousTables} className="btn btn-sm  btn-primary mr-2 gap-2 shadow-lg shadow-primary/10">
      <FontAwesomeIcon icon={faArrowLeft} size={'1x'} />
    </button>
  }

  function renderButtonFinishOrder() {
    if (order.getCurrentTable()?.order.status === OrderStatus.AVAILABLE) {
      return;
    }
    return <button onClick={props.onFinishTable} className="btn btn-sm  btn-primary ml-2 gap-2 shadow-lg shadow-primary/10">
      <FontAwesomeIcon icon={faClose} size={'1x'} />
    </button>
  }

  function renderButtonCart() {
    <button onClick={() => {
      setZIndexHabilit(true)
      props.onOpenCart()
    }} className="btn btn-sm btn-primary border-primary gap-2 shadow-lg shadow-primary/10 ">
      <FontAwesomeIcon className='text-primary-content' icon={faCartShopping} size={'1x'} />
      <div className="badge badge-primary badge-sm">+{order?.getCurrentTable()?.order.items.length}</div>
    </button>
  }

  useEffect(() => {
    setZIndexHabilit(!props.closeModal)
  }, [props.closeModal])

  let header = "header pr-7 pt-2  border-1 border-primary-focus w-full fixed text-right text-primary"
  header += zIndexHabilit ? "header pr-7 pt-2 border-1 border-primary-focus w-full fixed text-right text-primary z-10" : ""

  return <>
    <div className={header}>
      {renderButtonPrevious()}
      {renderButtonCart()}
      {renderButtonFinishOrder()}
    </div>
  </>
}

export default MenuHeader;