<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="商品名称" prop="productName">
        <Input v-model="formValidate.productName" placeholder="输入商品名称"></Input>
      </FormItem>
      <FormItem label="所属分类" prop="categoryId">
        <Select v-model="formValidate.categoryId" placeholder="选择分类">
          <Option v-for="item in categoryList" :value="item.id.toString()" :key="item.categoryName">{{item.categoryName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="商品详情" prop="productInfo">
        <Input v-model="formValidate.productInfo" placeholder="输入商品详情"></Input>
      </FormItem>
      <FormItem label="商品图片" prop="productImg">
        <Input v-model="formValidate.productImg" placeholder="上传商品图片"></Input>
      </FormItem>
      <FormItem label="商品原价" prop="productOrgPrice">
        <Input v-model="formValidate.productOrgPrice" placeholder="输入商品原价" number></Input>
      </FormItem>
      <FormItem label="商品实价" prop="productPrice">
        <Input v-model="formValidate.productPrice" placeholder="输入商品实价" number></Input>
      </FormItem>
      <FormItem label="商品库存" prop="productStock">
        <Input v-model="formValidate.productStock" placeholder="输入商品库存" number></Input>
      </FormItem>
      <FormItem label="商品详情图片" prop="productInfoImg">
        <Input v-model="formValidate.productInfoImg" placeholder="上传商品详情图片"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { productAdd, productUpdate, productOne } from '@/api/product'
import { categoryList } from '@/api/category'
export default {
  mounted () {
    categoryList(1, 10).then(res => {
      if (res.data.code === 0) {
        this.categoryList = res.data.data.content
      } else {
        this.$Message.error(res.data.msg)
      }
    })
    if (!this.$route.query.id) return
    this.productId = this.$route.query.id
    productOne(this.$route.query.id).then(res => {
      if (res.data.code === 0) {
        this.formValidate.productName = res.data.data.productName
        this.formValidate.categoryId = res.data.data.categoryId.toString()
        this.formValidate.productInfo = res.data.data.productInfo
        this.formValidate.productImg = res.data.data.productImg
        this.formValidate.productPrice = res.data.data.productPrice
        this.formValidate.productOrgPrice = res.data.data.productOrgPrice
        this.formValidate.productStock = res.data.data.productStock
        this.formValidate.productInfoImg = res.data.data.productInfoImg
      } else {
        this.$Message.error(res.data.msg)
      }
    })
  },
  data () {
    return {
      productId: 0,
      categoryList: [],
      formValidate: {
        productName: '',
        categoryId: '',
        productInfo: '',
        productImg: '',
        productPrice: 0.0,
        productOrgPrice: 0.0,
        productStock: 0,
        productInfoImg: ''
      },
      ruleValidate: {
        productName: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择商品所属分类', trigger: 'change' }
        ],
        productInfo: [
          { required: true, message: '商品详情不能为空', trigger: 'blur' }
        ],
        productOrgPrice: [
          { type: 'number', required: true, message: '商品原价不能为空', trigger: 'blur' }
        ],
        productPrice: [
          { type: 'number', required: true, message: '商品实价不能为空', trigger: 'blur' }
        ],
        productStock: [
          { type: 'number', required: true, message: '商品库存不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.productId === 0) {
            productAdd(
              this.formValidate.productName,
              this.formValidate.categoryId,
              this.formValidate.productInfo,
              this.formValidate.productImg,
              this.formValidate.productPrice,
              this.formValidate.productOrgPrice,
              this.formValidate.productStock,
              this.formValidate.productInfoImg
            ).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('操作成功!')
                this.$router.push({ name: 'product-list-page' })
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          } else {
            productUpdate(
              this.productId,
              this.formValidate.productName,
              this.formValidate.categoryId,
              this.formValidate.productInfo,
              this.formValidate.productImg,
              this.formValidate.productPrice,
              this.formValidate.productOrgPrice,
              this.formValidate.productStock,
              this.formValidate.productInfoImg
            ).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('操作成功!')
                this.$router.push({ name: 'product-list-page' })
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          }
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
