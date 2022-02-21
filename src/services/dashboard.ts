import api from "./api"

export const DashboardService = {
  index: (date: string) => {
    return api.get('admin/dashboard?date=' + date).then((response) => response.data)
  }
}