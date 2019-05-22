import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  return axios.request({
    headers: {
      Authorization: 'Basic Z290c2hvcDpnb3RzaG9wc2VjcmV0'
    },
    url: 'oauth/token',
    params: {
      grant_type: 'password',
      username: userName,
      password
    },
    method: 'post'
  })
}

// 刷新令牌
export const doRefreshToken = (refreshToken) => {
  return axios.request({
    headers: {
      Authorization: 'Basic Z290c2hvcDpnb3RzaG9wc2VjcmV0='
    },
    url: '/oauth/token',
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/user/me',
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: '/hello/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
