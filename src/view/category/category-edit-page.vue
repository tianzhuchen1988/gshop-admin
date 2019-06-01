<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="分类名称" prop="categoryName">
        <Input v-model="formValidate.categoryName" placeholder="输入分类名称"></Input>
      </FormItem>
      <FormItem label="分类排序码" prop="sortOrder">
        <Select v-model="formValidate.sortOrder" placeholder="选择排序码">
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="8">8</Option>
          <Option value="9">9</Option>
          <Option value="10">10</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { categorySave, categoryOne } from '@/api/category'
export default {
  mounted () {
    if (!this.$route.query.id) return
    this.categoryId = this.$route.query.id
    categoryOne(this.$route.query.id).then(res => {
      if (res.data.code === 0) {
        this.formValidate.categoryName = res.data.data.categoryName
        this.formValidate.sortOrder = res.data.data.sortOrder.toString()
      } else {
        this.$Message.error(res.data.msg)
      }
    })
  },
  data () {
    return {
      categoryId: 0,
      formValidate: {
        categoryName: '',
        sortOrder: ''
      },
      ruleValidate: {
        categoryName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true, message: '请选择分类排序码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          categorySave(this.categoryId, this.formValidate.categoryName, this.formValidate.sortOrder).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('操作成功!')
              this.$router.push({ name: 'category-list-page' })
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
