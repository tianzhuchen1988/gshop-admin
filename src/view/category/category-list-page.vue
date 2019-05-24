<template>
  <div>
    <Card>
        <Form ref="formInline" inline label-position="left" :label-width="80">
          <FormItem label="分类名称：">
            <Input placeholder="请输入分类名称" clearable></Input>
          </FormItem>
          <FormItem label="分类等级：">
            <Select v-model="model1" style="width:200px" clearable>
              <Option v-for="item in levelList" :value="item.levelCode" :key="item.levelName">{{ item.levelName }}</Option>
            </Select>
          </FormItem>
          <Button type="primary" icon="ios-search">搜索</Button>
        </Form>
    </Card>
    <Card>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalSize" :current="1" :page-size="10" @on-change="changePage"></Page>
        </div>
        <div style="float: left;">
          <Button type="primary">新增</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary">导出</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import {categoryLevelList, categoryList} from '@/api/category'
  export default {
    mounted(){
      categoryLevelList().then(res => {
        if(res.data.code === 0){
          this.levelList = res.data.data
        }
      });
      categoryList(1, 10).then(res => {
        if(res.data.code === 0){
          this.tableData1 = res.data.data.content
          this.totalSize = res.data.data.totalElements
        }
      });
    },
    data () {
      return {
        levelList: [],
        model1: '',
        tableData1: [],
        totalSize: 0,
        tableColumns1: [
          {
            title: 'id',
            key: 'id'
          },
          {
            title: 'categoryName',
            key: 'categoryName'
          },
          {
            title: 'categoryStatus',
            key: 'categoryStatus'
          },
          {
            title: 'Action',
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
                      const id = parseInt(Math.random() * 100000)
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
              ]);
            }
          }
        ]
      }
    },
    methods: {
      formatDate (date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      changePage (curPage) {
        categoryList(curPage, 10).then(res => {
          if(res.data.code === 0){
            this.tableData1 = res.data.data.content
          }
        })
      }
    }
  }
</script>
