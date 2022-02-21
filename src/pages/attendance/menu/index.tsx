import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import { toast } from "react-toastify";

import MenuHeader from "../../../components/Menu/Header";
import { OrderItemType, OrderStatus, useOrder } from "../../../contexts/OrderContext";
import Categories from "../../../components/Menu/Categories";
import ProductList from "../../../components/Menu/ProductList";
import { formatCurrency } from "../../../util/currency";

Modal.setAppElement("#root")

const customStyles = {
  overlay: {
    background: 'rgb(147 241 201 / 58%)'
  },
  content: {
    background: '#000004',
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const MenuPage = () => {
  const order = useOrder();
  const [openModalCart, setOpenModalCart] = useState(false);
  const [openModalConfirmFinishTable, setOpenModalConfirmFinishTable] = useState(false);
  const [productAsRemovable, setProductAsRemovable] = useState<number>(-1)
  const [category, setCategory] = useState<number>(-1)

  const navigate = useNavigate();

  const onDecrementQtd = (el: OrderItemType) => {
    order.decrementQtd(el.product.id)
  }

  const onIncrementQtd = (el: OrderItemType) => {
    order.incrementQtd(el.product.id)
  }

  const onRemoveProduct = (el: OrderItemType) => {
    order.removeProduct(el.product.id)
    setProductAsRemovable(-1);
    toast.success("Produto removido com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const onChangeObservation = (e: any) => {
    order.addObservation(e.target.value);
  }

  const onFinishOrder = () => {
    toast.success("Pedido finalizado com sucesso");
    order.finishOrder();
    navigate('/app/tables');
  }

  const onCreateOrder = () => {
    toast.success("Pedido enviado com sucesso");
    order.createOrder();
    navigate('/app/tables');
  }

  function renderModalConfirmFinishOrder() {
    return <Modal
      isOpen={openModalConfirmFinishTable}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="">
        <div className="justify-between card-actions">
          <p className="text-lg text-white font-bold">Mesa #{order?.getCurrentTable()?.table}</p>
          <button className="btn btn-square btn-sm" onClick={e => setOpenModalConfirmFinishTable(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <h1 className="mt-10 text-center font-semibold">Você realmente deseja finalizar</h1>
        <h2 className="text-stone-400 mt-2">Todos items lançado na mesa sera perdidos?</h2>
        <div className="mt-8 flex gap-2">
          <button className="btn flex-1 btn-primary btn-outline mt-2" onClick={e => setOpenModalConfirmFinishTable(false)}>Não</button>
          <button className="btn flex-1 btn-primary mt-2" onClick={() => onFinishOrder()}>Sim</button>
        </div>
      </div>
    </Modal>
  }

  function renderModalCartAndCreateOrder() {
    return <Modal
      isOpen={openModalCart}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="">
        <div className="justify-between card-actions">
          <p className="text-lg text-white font-bold">Mesa #{order?.getCurrentTable()?.table}</p>
          <button className="btn btn-square btn-sm" onClick={e => setOpenModalCart(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="overflow-auto mt-2 h-96">
          {order.getCurrentTable()?.order.items.map((e) => {
            return <div className="w-full mt-2">
              <div className="card card-side md:w-96 w-72  bg-base-200 shadow-xl border-b-2  border-primary">
                <div className="flex flex-col p-4 w-full">
                  {
                    productAsRemovable === e.product.id ? <div>
                      <p className="text-sm mb-2">Você realmente deseja remover {e.product.name} ?</p>
                      <div className="flex gap-2">
                        <button className="btn btn-sm" onClick={() => setProductAsRemovable(-1)}>Não</button>
                        <button className="btn btn-sm btn-primary" onClick={() => onRemoveProduct(e)}>Sim</button>
                      </div>

                    </div>
                      : <>
                        <h2 className="font-semibold text-white mb-1">{e.product.name}</h2>
                        <div className="flex justify-between card-actions mt-2 ">
                          <div className="flex-">
                            <button disabled={order.getCurrentTable()?.order.status === 'in_progress' ? true : false} className="btn btn-primary btn-sm btn-circle mr-4" onClick={() => onDecrementQtd(e)}>
                              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                            </button>
                            <span className="text-xl font-bold">{e.quantity}</span>
                            <button disabled={order.getCurrentTable()?.order.status === 'in_progress' ? true : false} className="btn btn-sm btn-primary btn-circle ml-4" onClick={() => onIncrementQtd(e)}>
                              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </button>
                            <button disabled={order.getCurrentTable()?.order.status === 'in_progress' ? true : false} className="btn btn-sm  btn-circle ml-2" onClick={() => setProductAsRemovable(e.product.id)}>
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                          </div>
                          <p className="text-sm font-bold text-white"> { formatCurrency(Number(e.product.price * e.quantity))}</p>
                        </div>
                      </>
                  }
                </div>

              </div>
            </div>
          })}
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <div className="font-semibold">Total</div>
            <div className="font-bold text-white"> {formatCurrency(order.calculateTotal())}</div>
          </div>
          <textarea
            className="textarea textarea-ghost w-full mb-1"
            cols={10}
            placeholder="Observações"
            onChange={onChangeObservation}
            value={order.getCurrentTable()?.order.observation ?? ''}
            disabled={order.getCurrentTable()?.order.status !== OrderStatus.AVAILABLE || order.getCurrentTable()?.order.items.length === 0 ? true : false}
          >
          </textarea>

          {
            order.getCurrentTable()?.order.status === OrderStatus.AVAILABLE ?
              <button disabled={order.getCurrentTable()?.order.items.length === 0} className="btn btn-block btn-primary mt-2" onClick={() => onCreateOrder()}>Finalizar Pedido</button>
              : <button className="btn btn-block btn-outline btn-primary mt-2" onClick={() => onFinishOrder()}>Cancelar Pedido</button>
          }
        </div>
      </div>
    </Modal>
  }

  function renderCategories() {
    return <div className="flex flex-row items-center max-h-full gap-2 fixed">
      <Categories onCategorySelect={(category) => setCategory(category)} />
    </div>
  }

  function renderContentDetails() {
    return <div className="details flex flex-col ">
      <MenuHeader
        onOpenCart={() => setOpenModalCart(true)}
        onPreviousTables={() => { navigate('/app/tables') }}
        onFinishTable={() => { setOpenModalConfirmFinishTable(true)}}
        closeModal={openModalCart}
      />
      <div className="mt-10"> <ProductList category={category} /> </div>
      {renderModalCartAndCreateOrder()}
      {renderModalConfirmFinishOrder()}
    </div>
  }

  return <div className="flex flex-row bg-black">
    {renderCategories()}
    {renderContentDetails()}
  </div>
}

export default MenuPage;