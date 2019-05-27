import axios from '@/libs/api.request'

export const categoryList = (page, size) => {
  return axios.request({
    url: '/back/category',
    method: 'get',
    params: {
      page: page,
      size: size
    }
  })
}
