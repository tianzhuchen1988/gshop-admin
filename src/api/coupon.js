import axios from '@/libs/api.request'

export const couponList = (page, size) => {
  return axios.request({
    url: '/back/coupon',
    method: 'get',
    params: {
      page: page,
      size: size
    }
  })
}

export const couponAdd = (couponName, couponValue, couponImg, couponStartAndEndDate) => {
  return axios.request({
    url: '/back/coupon',
    method: 'put',
    data: JSON.stringify({
      couponName: couponName,
      couponValue: couponValue,
      couponImg: couponImg,
      startDate: couponStartAndEndDate[0].getTime(),
      endDate: couponStartAndEndDate[1].getTime()
    })
  })
}

export const couponUpdate = (couponId, couponName, couponValue, couponImg, couponStartAndEndDate) => {
  return axios.request({
    url: '/back/coupon',
    method: 'post',
    data: JSON.stringify({
      id: couponId,
      couponName: couponName,
      couponValue: couponValue,
      couponImg: couponImg,
      startDate: couponStartAndEndDate[0].getTime(),
      endDate: couponStartAndEndDate[1].getTime()
    })
  })
}

export const couponOne = (couponId) => {
  return axios.request({
    url: '/back/coupon/' + couponId,
    method: 'get'
  })
}

export const couponDelete = (categoryId) => {
  return axios.request({
    url: '/back/coupon',
    method: 'delete',
    params: {
      id: categoryId
    }
  })
}
