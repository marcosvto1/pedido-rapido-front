import api from "./api"

export const CategoryService = {
  index: () => {

    return api.get('/front/categories', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
  show: (id: number | string) => {
    return api.get('/front/categories/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
  getProductByCategory: (category_id: number) => {
    return api.get('/front/categories/' + category_id + '/products', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  },
  admin: {
    index: (query?: string) => {
      let params = undefined;
      if (query) {
        params = new URLSearchParams({ q: query });
      }
      return api.get('/admin/categories?' + params).then((response) => response.data)
    },
    show: (id: any) => {
      return api.get('/admin/categories/' + id).then((response) => response.data)
    },
    create: (data: any) => {
      return api.post('/admin/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => response.data)
    },
    update: (id: number, data: any) => {
      return api.put('/admin/categories/' + id, data).then((response) => response.data)
    }
  }
}