import OrderItem from "./order_item";
import { KitchensOrderType } from "./types";

type OrderListProp = {
  orders: KitchensOrderType[],
  type: "todo" | "doing" | "done",
  title: string;
  whenDoneHandleCheck: (index: number, indexItem: number) => void;
  updateOrders: () => void;
}

const OrderList = ({ orders, type, title, whenDoneHandleCheck, updateOrders}: OrderListProp) => {
  return (
    <div className="flex flex-col bg-base-200 flex-1 card h-screen  border-primary p-1 overflow-y-visible no-scrollbar">
      <h1 className="text-center font-bold">{title}</h1>
      <div className="card-list flex flex-col gap-8 p-2">
        {orders.map((order, index) =>
          <OrderItem 
            key={index}
            index={index}
            order={order}
            type={type}
            whenDoneHandleCheck={whenDoneHandleCheck}
            updateOrders={updateOrders}
          />
        )}
      </div>
    </div>
  )
}

export default OrderList;