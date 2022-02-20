import { useEffect, useState } from "react";
import { OrderStatus } from "../../../contexts/OrderContext";
import { OrderService } from "../../../services/order";
import { KitchensOrderType } from "./types";

type OrderItemProp = {
  index: number,
  order: KitchensOrderType,
  type: "todo" | "doing" | "done",
  whenDoneHandleCheck: (index: number, indexItem: number) => void;
  updateOrders: () => void;
}

const OrderItem = ({ index, order: order_param, type, whenDoneHandleCheck, updateOrders }: OrderItemProp) => {

  const [order, setOrder] = useState<KitchensOrderType>({
    id: 0,
    order_items: [],
    status: OrderStatus.CANCELED,
    table: -1
  });

  useEffect(() => {
    console.log(order.order_items)
    setOrder({
      ...order_param,
      order_items: order.order_items.length > 0 ? [...order.order_items] : [...order_param.order_items]
    });
  }, [order_param])


  const onChangeStatusOrder = async (status: OrderStatus) => {
    const payload = {
      order: {
        status
      }
    }
    await OrderService.update(order.id, payload);
    await updateOrders();
  }

  const renderButtonsActions = () => {
    switch (type) {
      case "todo":
        return <button
          className="btn btn-sm btn-primary"
          onClick={() => onChangeStatusOrder(OrderStatus.IN_PROGRESS)}
        >
          Preparar
        </button>
      case "doing":
        return <button className="btn btn-sm btn-primary" disabled={disableBtn()} onClick={() => onChangeStatusOrder(OrderStatus.READY)}>Finalizar</button>
      case "done":
        return  <button className="btn btn-sm btn-primary" onClick={() => onChangeStatusOrder(OrderStatus.FINISH)}>Entregue</button>
    }
  }

  function disableBtn() {
    return order.order_items.some((order_item) => order_item.done === false);
  }

  function unCheckPreper(indexItem: number) {
    order.order_items[indexItem].done = !order.order_items[indexItem].done
    setOrder({...order})
  }

  return (
    <div className="card bg-black p-1">
      <div className="p-2">
        <div className="flex justify-between p-2">
          <p className="text-lg flex-1">
            Mesa #{order.table}
          </p>
          <p className="text-lg flex-1 text-right">
            Pedido #{order_param.id}
          </p>
        </div>

        <div tabIndex={0} className="collapse border border-base-200 bg-base-200 rounded-box collapse-plus">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            Pedido
          </div>
          <div className="collapse-content">
            <div>
            </div>
            {order.order_items.map((item, index) =>
              <div key={index} className="flex justify-between items-center">
                { type === 'doing' && 
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <input type="checkbox" defaultChecked={item.done} onClick={() => unCheckPreper(index)} className="checkbox checkbox-secondary" />
                  </label>
                </div>
                }
                <div className="text-md text-right">{item.quantity} X </div>
                <div className="text-sm text-right">{item.product.name}</div>
              </div>
            )}
          </div>
        </div>

        <div className="card-actions p-2">
          {renderButtonsActions()}
        </div>

      </div>
    </div>
  )
}

export default OrderItem;