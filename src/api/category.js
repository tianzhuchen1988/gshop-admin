import axios from '@/libs/api.request'

export const categoryLevelList = () => {
  return axios.request({
    url: 'levelList',
    method: 'get'
  });
}

export const categoryList = (page, size) => {
  return axios.request({
    url: 'list',
    method: 'post',
    params: {
      page: page,
      size: size,
      categoryName: 'abc'
    }
  });
}
