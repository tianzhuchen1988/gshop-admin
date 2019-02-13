import axios from '@/libs/api.request'

export const categoryLevelList = () => {
  return axios.request({
    url: 'levelList',
    method: 'get'
  });
}
