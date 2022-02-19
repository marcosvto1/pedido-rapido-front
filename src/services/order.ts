import api from "./api"

export const OrderService = {
  index: () => {
    return api.get('/front/orders', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },

  create: (order: any) => {
    return api.post('/front/orders', order, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
  
  update: (id: number, order: any) => {
    return api.put('/front/orders/' + id, order, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
}