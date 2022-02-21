import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderService } from "../services/order";
import { TableService } from "../services/tables";

export interface IProduct {
  id: number;
  name: string;
  price: number,
  image_url: string;
  category_id: number;
}

export enum OrderStatus {
  AVAILABLE="available",
  OPENED="opened",
  IN_PROGRESS="in_progress",
  CANCELED="canceled",
  READY="ready",
  FINISH="finish"
}
export interface IOrderItem {
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  items: IOrderItem[];
}

export type OrderItemType = {
  product: IProduct;
  quantity: number;
}

export type OrderType = {
  id?: number,
  items: OrderItemType[];
  status: OrderStatus
  observation?: string;
}

export type TableItemType = {
  table: number;
  status: 'in_use' | 'available';
  order: OrderType
}

export interface IOrderContext {
  tables: TableItemType[],
  addItemCart(item: IOrderItem): void;
  getCurrentTable(): TableItemType | undefined;
  incrementQtd(productId: number): void;
  decrementQtd(productId: number): void;
  removeProduct(productId: number): void;
  addObservation(value: string): void;
  createOrder(): void;
  finishOrder(): void;
  calculateTotal(): number;
  updateTable(table: TableItemType): void
}

const CartContext = createContext<IOrderContext>({
  tables: [],
  getCurrentTable: () => ({ table: 1, status: 'available', order: {items: [], status: OrderStatus.OPENED}}),
  addItemCart: (item: IOrderItem) => {},
  incrementQtd:(productId: number) => {},
  decrementQtd:(productId: number) => {},
  removeProduct: (productId: number) => {},
  addObservation: (value: string) => {},
  createOrder: () => {},
  finishOrder: () => {},
  calculateTotal: () => 0,
  updateTable: (table: TableItemType) => {}
})

export const useOrder = () => {
  return useContext(CartContext);
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  let params = useParams();
  const [tables, setTables] = useState<TableItemType[]>([]);

  useEffect(() => {
    initTables();
  }, [])

  const initTables = async () => {
    const { tables } = await TableService.index(); 
    if (tables) {
      const tablesItems = tables.map((table: any) => ({
        order: {
          id: table.order?.id ?? undefined,
          status: table.order?.status || OrderStatus.AVAILABLE,
          items: []
        },
        status: table.status,
        table: table.table
      }))
      setTables([
        ...tablesItems
      ])
    }  
  }

  const addObservation = (value: string) => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    tableCurrent.order.observation = value;

    updateTable(tableCurrent)
  }

  function getIndexProductByTableCurrent(tableCurrent: TableItemType, productId: number) {
    const productAreadyExistsIndex = tableCurrent.order.items.findIndex((predicate) => predicate.product.id === productId )
    return productAreadyExistsIndex;
  }

  const updateTable = (tableCurrent: TableItemType) => {
    tables.forEach((element, index) => {
      if (element.table === tableCurrent.table) {
        tables[index] = tableCurrent;
      }
    });
    setTables([...tables])
  }

  const addItemCart = (item: OrderItemType) => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;
    const productAreadyExistsIndex = getIndexProductByTableCurrent(tableCurrent, item.product.id)
    if (productAreadyExistsIndex !== -1) {
      tableCurrent.order.items[productAreadyExistsIndex].quantity += 1
    } else {
      tableCurrent.order.items.push(item);
    }
    updateTable(tableCurrent);
  }

  const getCurrentTable = () => {
    if (params && params.id !== undefined) {
      const currentTable = tables.find((el) => {
        if (params.id !== undefined) {
          return el.table === parseInt(params.id);
        }
        return el;
      })
      return currentTable;
    }
  }

  const decrementQtd = (productId: number) => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    const productAreadyExistsIndex = getIndexProductByTableCurrent(tableCurrent, productId)
    if (productAreadyExistsIndex !== -1 && tableCurrent.order.items[productAreadyExistsIndex].quantity - 1 > 0) {
      tableCurrent.order.items[productAreadyExistsIndex].quantity -= 1
    }
    updateTable(tableCurrent);
  }

  const incrementQtd = (productId: number) => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    const productAreadyExistsIndex = getIndexProductByTableCurrent(tableCurrent, productId)
    if (productAreadyExistsIndex !== -1) {
      tableCurrent.order.items[productAreadyExistsIndex].quantity += 1
    }
    updateTable(tableCurrent);
  }
  
  const removeProduct = (productId: number) => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;
    tableCurrent.order.items = tableCurrent.order.items.filter((item) => item.product.id !== productId)
    updateTable(tableCurrent);
  }

  const createOrder = async () => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    try {
      const result = await OrderService.create({
        table: tableCurrent.table,
        order_items_attributes: tableCurrent.order.items.map((el) => ({ product_id: el.product.id, quantity: el.quantity })),
        detail: tableCurrent.order.observation,
        status: 1
      });
      if (result.order.id) {
        tableCurrent.order.status = OrderStatus.IN_PROGRESS
        tableCurrent.status = 'in_use';
        tableCurrent.order.id = result.order.id;
        updateTable(tableCurrent);
      }
    } catch (error) {
      toast.error('Falha ao realizar pedido');
    }
  }
  
  const finishOrder =  async () => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    tableCurrent.order.items = [];
    tableCurrent.order.observation = '';
    tableCurrent.order.status = OrderStatus.CANCELED;
    tableCurrent.status = 'available';

    if (tableCurrent.order.id) {
      const result = await OrderService.update(tableCurrent.order.id,{
        table: tableCurrent.table,
        order_items_attributes: tableCurrent.order.items.map((el) => ({ product_id: el.product.id, quantity: el.quantity })),
        detail: tableCurrent.order.observation,
        status: OrderStatus.CANCELED
      });
      console.log(result);
    }
    
    updateTable(tableCurrent);
  }

  const calculateTotal = () => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return 0;
    const total = tableCurrent.order.items.reduce((acc, item) => (item.quantity * item.product.price) + acc, 0)
    return total;
  }
  
  const value = {
    tables,
    addItemCart,
    getCurrentTable,
    decrementQtd,
    incrementQtd,
    removeProduct,
    addObservation,
    createOrder,
    finishOrder,
    calculateTotal,
    updateTable
  }

  return <CartContext.Provider value={value}>
    { children }
  </CartContext.Provider>
}
