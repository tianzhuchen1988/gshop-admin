<template>
  <div>
    <Card>
        <Form ref="formInline" inline label-position="left" :label-width="80">
          <FormItem label="分类名称：">
            <Input placeholder="请输入分类名称" v-model="categoryName" clearable></Input>
          </FormItem>
          <!--<FormItem label="分类等级：">
            <Select style="width:200px" clearable>
              <Option v-for="item in levelList" :value="item.levelCode" :key="item.levelName">{{ item.levelName }}</Option>
            </Select>
          </FormItem>-->
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
import { categoryList } from '@/api/category'
export default {
  mounted () {
    this.levelList = [{ levelCode: 0, levelName: '父级' }, { levelCode: 1, levelName: '子级' }]
    categoryList(1, this.pageSize, this.categoryName).then(res => {
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
      levelList: [],
      model1: '',
      categoryName: '',
      tableData1: [],
      totalSize: 0,
      pageSize: 10,
      tableColumns1: [
        {
          title: '分类id',
          key: 'id'
        },
        {
          title: '分类名称',
          key: 'categoryName'
        },
        {
          title: '分类排序码',
          key: 'sortOrder'
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
                      name: 'category-update-page',
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
                    this.remove(params.index)
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
      categoryList(curPage, this.pageSize, this.categoryName).then(res => {
        if (res.data.code === 0) {
          this.tableData1 = res.data.data.content
        }
      })
    },
    toAddPage () {
      this.$router.push({ name: 'category-add-page' })
    }
  }
}
</script>
