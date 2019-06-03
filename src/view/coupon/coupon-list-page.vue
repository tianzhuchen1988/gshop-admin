<template>
  <div>
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
import { couponList, couponDelete } from '@/api/coupon'
export default {
  mounted () {
    couponList(1, this.pageSize).then(res => {
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
      tableData1: [],
      totalSize: 0,
      pageSize: 10,
      tableColumns1: [
        {
          title: '优惠券id',
          key: 'id'
        },
        {
          title: '优惠券名称',
          key: 'couponName'
        },
        {
          title: '优惠券金额',
          key: 'couponValue'
        },
        {
          title: '优惠券图片',
          key: 'couponImg'
        },
        {
          title: '有效起始时间',
          key: 'startDate',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].startDate))
          }
        },
        {
          title: '有效结束时间',
          key: 'endDate',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].endDate))
          }
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
                      name: 'coupon-update-page',
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
      couponList(curPage, this.pageSize).then(res => {
        if (res.data.code === 0) {
          this.tableData1 = res.data.data.content
        }
      })
    },
    toAddPage () {
      this.$router.push({ name: 'coupon-add-page' })
    },
    handleClickDelete (id, index) {
      couponDelete(id).then(res => {
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
