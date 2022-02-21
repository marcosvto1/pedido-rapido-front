import api from "./api"

export const EmployerService = {
  index: (query?: string) => {
    let params = undefined;
    if (query) {
      params = new URLSearchParams({ q: query });
    }
    return api.get('/admin/employees?' + params).then((response) => response.data)
  },

  show: (id: number | string) => {
    return api.get('/admin/employees/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },

  create: (order: any) => {
    return api.post('/admin/employees', order, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
  
  update: (id: number, order: any) => {
    return api.put('/admin/employees/' + id, order, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
}