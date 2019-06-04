<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="消息类型名称" prop="typeName">
        <Input v-model="formValidate.typeName" placeholder="输入消息类型名称"></Input>
      </FormItem>
      <FormItem label="消息内容" prop="typeInfo">
        <Input v-model="formValidate.typeInfo" placeholder="输入消息内容"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { messageTypeAdd, messageTypeUpdate, messageTypeOne } from '@/api/messageType'
export default {
  mounted () {
    if (!this.$route.query.id) return
    this.messageTypeId = this.$route.query.id
    messageTypeOne(this.$route.query.id).then(res => {
      if (res.data.code === 0) {
        this.formValidate.typeName = res.data.data.typeName
        this.formValidate.typeInfo = res.data.data.typeInfo
      } else {
        this.$Message.error(res.data.msg)
      }
    })
  },
  data () {
    return {
      messageTypeId: 0,
      formValidate: {
        typeName: '',
        typeInfo: ''
      },
      ruleValidate: {
        typeName: [
          { required: true, message: '消息类型名称不能为空', trigger: 'blur' }
        ],
        typeInfo: [
          { required: true, message: '消息内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.messageTypeId === 0) {
            // 新增
            messageTypeAdd(this.formValidate.typeName, this.formValidate.typeInfo).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('操作成功!')
                this.$router.push({ name: 'messageType-list-page' })
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          } else {
            messageTypeUpdate(this.messageTypeId, this.formValidate.typeName, this.formValidate.typeInfo).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('操作成功!')
                this.$router.push({ name: 'messageType-list-page' })
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
