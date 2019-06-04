<template>
  <div>
    <Card>
        <Form ref="formInline" inline label-position="left" :label-width="80">
          <FormItem label="类型名称：">
            <Input placeholder="请输入类型名称" v-model="typeName" clearable></Input>
          </FormItem>
          <Button type="primary" icon="ios-search" @click="changePage(1)">搜索</Button>
        </Form>
    </Card>
    <Card>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalSize" :current="1" :page-size="pageSize" @on-change="changePage"></Page>
        </div>
        <div style="float: left;">
          <Button type="primary" @click="toAddPage()">新增</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary">导出</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { messageTypeList, messageTypeDelete } from '@/api/messageType'
export default {
  mounted () {
    messageTypeList(1, this.pageSize, this.typeName).then(res => {
      if (res.data.code === 0) {
        this.tableData1 = res.data.data.content
        this.totalSize = res.data.data.totalElements
      } else {
        this.$Message.error(res.data.msg)
      }
    })
  },
  data () {
    return {
      model1: '',
      typeName: '',
      tableData1: [],
      totalSize: 0,
      pageSize: 10,
      tableColumns1: [
        {
          title: '类型id',
          key: 'id'
        },
        {
          title: '消息类型名称',
          key: 'typeName'
        },
        {
          title: '消息内容',
          key: 'typeInfo'
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].createTime))
          }
        },
        {
          title: '更新时间',
          key: 'updateTime',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].updateTime))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    const id = this.tableData1[params.index].id
                    const route = {
                      name: 'messageType-update-page',
                      query: {
                        id
                      },
                      meta: {
                        title: `参数-${id}`
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleClickDelete(this.tableData1[params.index].id, params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    formatDate (timestamp) {
      const date = new Date(timestamp)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    changePage (curPage) {
      messageTypeList(curPage, this.pageSize, this.typeName).then(res => {
        if (res.data.code === 0) {
          this.tableData1 = res.data.data.content
        }
      })
    },
    toAddPage () {
      this.$router.push({ name: 'messageType-add-page' })
    },
    handleClickDelete (id, index) {
      messageTypeDelete(id).then(res => {
        if (res.data.code === 0) {
          this.$Message.success('操作成功')
          this.changePage(1)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
