import api from "./api"

export const ProductService = {
  index: (query?: string) => {
    let params = undefined;
    if (query) {
      params = new URLSearchParams({ q: query });
    }
    return api.get('/admin/products?' + params).then((response) => response.data)
  },

  show: (id: number | string) => {
    return api.get('/admin/products/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },

  create: (order: any) => {
    return api.post('/admin/products', order, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
  
  update: (id: number, order: any) => {
    return api.put('/admin/products/' + id, order, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
}