import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OrderStatus } from "../../../contexts/OrderContext";
import { OrderService } from "../../../services/order";
import OrderList from "./order_list";


type OrderItemStateType = {
  id: number,
  product: { id: number, name: string }
  quantity: number,
  done: boolean
}

type OrderStateType = {
  id: number;
  table: number;
  status: OrderStatus,
  order_items: OrderItemStateType[]
}

type KitchensState = {
  todo: OrderStateType[],
  doing: OrderStateType[],
  done: OrderStateType[],
}

const KitchensPage = () => {
  const [orders, setOrders] = useState<KitchensState>({
    todo: [],
    doing: [],
    done: []
  })

  const fetchData = async () => {
    const result = await OrderService.index();
    const orders_mapped = {
      ...result.orders,
      doing: result.orders.doing.map((order: any, index: number) => ({
        ...order,
        order_items: order.order_items.map((order_item: any) => ({
          ...order_item,
          done: false,
        }))
      })),
    }
    setOrders({ ...orders_mapped });
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000)
    return () => clearInterval(intervalId);
  }, [])


  const whenDoneHandleCheck = (index: number, indexItem: number) => {
    const order_udpate = orders;
    order_udpate.doing[index].order_items[indexItem].done = !order_udpate.doing[index].order_items[indexItem].done;
    setOrders({ ...order_udpate });
  }

  return <div className="p-2 bg-black">
    <div className="flex justify-between p-2 items-center">
      <h1 className="font-bold text-2xl">Kitchen's Kanban 👨‍🍳</h1>
      <FontAwesomeIcon icon={faUser} size={'2x'} />
    </div>

    <div className="flex gap-8 mt-2 p-2">
      <OrderList orders={orders.todo} type="todo" title="Todo" whenDoneHandleCheck={whenDoneHandleCheck} updateOrders={fetchData} />
      <OrderList orders={orders.doing} type="doing" title="Doing" whenDoneHandleCheck={whenDoneHandleCheck} updateOrders={fetchData} />
      <OrderList orders={orders.done} type="done" title="Done" whenDoneHandleCheck={whenDoneHandleCheck} updateOrders={fetchData} />
    </div>
  </div>
}

export default KitchensPage;