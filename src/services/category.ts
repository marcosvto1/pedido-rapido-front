import api from "./api"

export const CategoryService = {
  index: () => {
    return api.get('/front/categories', {
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
  }
}