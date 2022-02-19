import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export interface IProduct {
  id: number;
  name: string;
  price: number,
  image_url: string;
  category_id: number;
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
  items: OrderItemType[];
  status: 'in_progress' | 'opened' | 'finished' | undefined,
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
}

const CartContext = createContext<IOrderContext>({
  tables: [],
  getCurrentTable: () => ({ table: 1, status: 'available', order: {items: [], status: undefined}}),
  addItemCart: (item: IOrderItem) => {},
  incrementQtd:(productId: number) => {},
  decrementQtd:(productId: number) => {},
  removeProduct: (productId: number) => {},
  addObservation: (value: string) => {},
  createOrder: () => {},
  finishOrder: () => {},
  calculateTotal: () => 0
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

  const initTables = () => {
    setTables([
      {
        order: {
          items: [],
          status: 'opened'
        },
        status: 'available',
        table: 1
      },
      {
        order: {
          items: [],
          status: 'opened'
        },
        status: 'available',
        table: 2
      },
    ])
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

  const createOrder = () => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    tableCurrent.order.status = 'in_progress';
    tableCurrent.status = 'in_use';

    updateTable(tableCurrent);
  }
  
  const finishOrder = () => {
    const tableCurrent = getCurrentTable();
    if (!tableCurrent) return;

    tableCurrent.order.items = [];
    tableCurrent.order.observation = '';
    tableCurrent.order.status = 'opened';
    tableCurrent.status = 'available';

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
    calculateTotal
  }

  return <CartContext.Provider value={value}>
    { children }
  </CartContext.Provider>
}
