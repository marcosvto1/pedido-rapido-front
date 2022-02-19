import api from "./api"

export const TableService = {
  index: () => {
    return api.get('/front/tables').then(response => response.data)
  }
}