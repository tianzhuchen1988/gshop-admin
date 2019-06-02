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
    method: 'put',
    data: JSON.stringify({ categoryName: categoryName, sortOrder: sortOrder })
  })
}

export const categoryUpdate = (categoryId, categoryName, sortOrder) => {
  return axios.request({
    url: '/back/category',
    method: 'post',
    data: JSON.stringify({ id: categoryId, categoryName: categoryName, sortOrder: sortOrder })
  })
}

export const categoryOne = (categoryId) => {
  return axios.request({
    url: '/back/category/' + categoryId,
    method: 'get'
  })
}

export const categoryDelete = (categoryId) => {
  return axios.request({
    url: '/back/category',
    method: 'delete',
    params: {
      id: categoryId
    }
  })
}
