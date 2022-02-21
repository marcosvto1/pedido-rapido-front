import { OrderStatus } from "../../../contexts/OrderContext"

export type KitchensOrderItemType = {
  id: number,
  product: { id: number, name: string}
  quantity: number,
  done: boolean;
}

export type KitchensOrderType = {
  id: number;
  table: number;
  status: OrderStatus,
  order_items: KitchensOrderItemType[],
  detail?: string;
}

export type KitchensState = {
  todo: KitchensOrderType[],
  doing:  KitchensOrderType[],
  done: KitchensOrderType[],
}