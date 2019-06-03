<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="优惠券名称" prop="couponName">
        <Input v-model="formValidate.couponName" placeholder="输入优惠券名称"></Input>
      </FormItem>
      <FormItem label="优惠券金额" prop="couponValue">
        <Input v-model="formValidate.couponValue" placeholder="输入优惠券金额" number></Input>
      </FormItem>
      <FormItem label="优惠券图片" prop="couponImg">
        <Input v-model="formValidate.couponImg" placeholder="上传优惠券图片"></Input>
      </FormItem>
      <FormItem label="优惠券有效期" prop="couponStartAndEndDate">
        <DatePicker v-model="formValidate.couponStartAndEndDate" type="daterange" placeholder="选择起止时间"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { couponAdd, couponUpdate, couponOne } from '@/api/coupon'
export default {
  mounted () {
    if (!this.$route.query.id) return
    this.couponId = this.$route.query.id
    couponOne(this.$route.query.id).then(res => {
      if (res.data.code === 0) {
        this.formValidate.couponName = res.data.data.couponName
        this.formValidate.couponValue = res.data.data.couponValue
        this.formValidate.couponImg = res.data.data.couponImg
        const startDate = new Date(res.data.data.startDate)
        const endDate = new Date(res.data.data.endDate)
        const dateArr = []
        dateArr.push(startDate)
        dateArr.push(endDate)
        this.formValidate.couponStartAndEndDate = dateArr
      } else {
        this.$Message.error(res.data.msg)
      }
    })
  },
  data () {
    return {
      couponId: 0,
      formValidate: {
        couponName: '',
        couponValue: '',
        couponImg: '',
        couponStartAndEndDate: ''
      },
      ruleValidate: {
        couponName: [
          { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
        ],
        couponValue: [
          { type: 'number', required: true, message: '优惠券金额不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.couponId === 0) {
            // 新增
            couponAdd(this.formValidate.couponName,
              this.formValidate.couponValue,
              this.formValidate.couponImg,
              this.formValidate.couponStartAndEndDate).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('操作成功!')
                this.$router.push({ name: 'coupon-list-page' })
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          } else {
            couponUpdate(this.couponId,
              this.formValidate.couponName,
              this.formValidate.couponValue,
              this.formValidate.couponImg,
              this.formValidate.couponStartAndEndDate).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('操作成功!')
                this.$router.push({ name: 'coupon-list-page' })
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
