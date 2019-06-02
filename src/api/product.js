import axios from '@/libs/api.request'

export const productList = (page, size) => {
  return axios.request({
    url: '/back/product',
    method: 'get',
    params: {
      page: page,
      size: size
    }
  })
}

export const productAdd = (productName, categoryId, productInfo, productImg, productPrice, productOrgPrice, productStock, productInfoImg) => {
  return axios.request({
    url: '/back/product',
    method: 'put',
    data: JSON.stringify({
      productName: productName,
      categoryId: categoryId,
      productInfo: productInfo,
      productImg: productImg,
      productPrice: productPrice,
      productOrgPrice: productOrgPrice,
      productStock: productStock,
      productInfoImg: productInfoImg
    })
  })
}

export const productUpdate = (productId, productName, categoryId, productInfo, productImg, productPrice, productOrgPrice, productStock, productInfoImg) => {
  return axios.request({
    url: '/back/product',
    method: 'post',
    data: JSON.stringify({
      id: productId,
      productName: productName,
      categoryId: categoryId,
      productInfo: productInfo,
      productImg: productImg,
      productPrice: productPrice,
      productOrgPrice: productOrgPrice,
      productStock: productStock,
      productInfoImg: productInfoImg
    })
  })
}

export const productOne = (productId) => {
  return axios.request({
    url: '/back/product/' + productId,
    method: 'get'
  })
}

export const productDelete = (productId) => {
  return axios.request({
    url: '/back/product',
    method: 'delete',
    params: {
      id: productId
    }
  })
}
