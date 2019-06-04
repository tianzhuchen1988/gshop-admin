import axios from '@/libs/api.request'

export const messageTypeList = (page, size, messageTypeName) => {
  return axios.request({
    url: '/back/messageType',
    method: 'get',
    params: {
      page: page,
      size: size,
      typeName: messageTypeName
    }
  })
}

export const messageTypeAdd = (messageTypeName, typeInfo) => {
  return axios.request({
    url: '/back/messageType',
    method: 'put',
    data: JSON.stringify({ typeName: messageTypeName, typeInfo: typeInfo })
  })
}

export const messageTypeUpdate = (messageTypeId, messageTypeName, typeInfo) => {
  return axios.request({
    url: '/back/messageType',
    method: 'post',
    data: JSON.stringify({ id: messageTypeId, typeName: messageTypeName, typeInfo: typeInfo })
  })
}

export const messageTypeOne = (messageTypeId) => {
  return axios.request({
    url: '/back/messageType/' + messageTypeId,
    method: 'get'
  })
}

export const messageTypeDelete = (messageTypeId) => {
  return axios.request({
    url: '/back/messageType',
    method: 'delete',
    params: {
      id: messageTypeId
    }
  })
}
