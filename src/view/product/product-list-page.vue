<template>
  <div>
    <Card>
      <!--<Form ref="formInline" inline label-position="left" :label-width="80">
        <FormItem label="商品名称：">
          <Input placeholder="请输入商品名称" v-model="productName" clearable></Input>
        </FormItem>
        <FormItem label="所属分类：">
          <Select style="width:200px" clearable>
            <Option v-for="item in categoryList" :value="item.levelCode" :key="item.levelName">{{ item.levelName }}</Option>
          </Select>
        </FormItem>
        <Button type="primary" icon="ios-search" @click="changePage(1)">搜索</Button>
      </Form>-->
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
import { productList, productDelete } from '@/api/product'
export default {
  mounted () {
    productList(1, this.pageSize, this.categoryName).then(res => {
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
          title: '商品id',
          key: 'id'
        },
        {
          title: '商品名称',
          key: 'productName'
        },
        {
          title: '商品详情',
          key: 'productInfo'
        },
        {
          title: '商品图片',
          key: 'productImg'
        },
        {
          title: '商品原价',
          key: 'productOrgPrice'
        },
        {
          title: '商品实价',
          key: 'productPrice'
        },
        {
          title: '商品库存',
          key: 'productStock'
        },
        {
          title: '所属分类',
          key: 'categoryName'
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
                      name: 'product-update-page',
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
    changePage (curPage) {
      productList(curPage, this.pageSize).then(res => {
        if (res.data.code === 0) {
          this.tableData1 = res.data.data.content
        }
      })
    },
    toAddPage () {
      this.$router.push({ name: 'product-add-page' })
    },
    handleClickDelete (id, index) {
      productDelete(id).then(res => {
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
