import axios from '@/libs/api.request'

export const categoryList = (page, size, categoryName) => {
  return axios.request({
    url: '/back/category',
    method: 'get',
    params: {
      page: page,
      size: size,
      categoryName: categoryName
    }
  })
}

export const categoryAdd = (categoryName, sortOrder) => {
  return axios.request({
    url: '/back/category',
    method: 'post',
    data: JSON.stringify({ categoryName: categoryName, sortOrder: sortOrder })
  })
}
