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
          <Page :total="100" :current="1" @on-change="changePage"></Page>
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
  import {categoryLevelList} from '@/api/category'
  export default {
    mounted(){
      categoryLevelList().then(res => {
        if(res.data.code === 0){
          this.levelList = res.data.data;
        }
      })
    },
    data () {
      return {
        levelList: [],
        model1: '',
        tableData1: this.mockTableData1(),
        tableColumns1: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Status',
            key: 'status',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
              const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: 'Portrayal',
            key: 'portrayal',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: params.row.portrayal.length + 'portrayals',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.portrayal.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData1[params.index].portrayal.map(item => {
                    return h('li', {
                      style: {
                        textAlign: 'center',
                        padding: '4px'
                      }
                    }, item)
                  }))
                ])
              ]);
            }
          },
          {
            title: 'People',
            key: 'people',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: params.row.people.length + 'customers',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.people.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData1[params.index].people.map(item => {
                    return h('li', {
                      style: {
                        textAlign: 'center',
                        padding: '4px'
                      }
                    }, item.n + '：' + item.c + 'People')
                  }))
                ])
              ]);
            }
          },
          {
            title: 'Sampling Time',
            key: 'time',
            render: (h, params) => {
              return h('div', 'Almost' + params.row.time + 'days');
            }
          },
          {
            title: 'Updated Time',
            key: 'update',
            render: (h, params) => {
              return h('div', this.formatDate(this.tableData1[params.index].update));
            }
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
      mockTableData1 () {
        let data = [];
        for (let i = 0; i < 10; i++) {
          data.push({
            name: 'Business' + Math.floor(Math.random () * 100 + 1),
            status: Math.floor(Math.random () * 3 + 1),
            portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
            people: [
              {
                n: 'People' + Math.floor(Math.random () * 100 + 1),
                c: Math.floor(Math.random () * 1000000 + 100000)
              },
              {
                n: 'People' + Math.floor(Math.random () * 100 + 1),
                c: Math.floor(Math.random () * 1000000 + 100000)
              },
              {
                n: 'People' + Math.floor(Math.random () * 100 + 1),
                c: Math.floor(Math.random () * 1000000 + 100000)
              }
            ],
            time: Math.floor(Math.random () * 7 + 1),
            update: new Date()
          })
        }
        return data;
      },
      formatDate (date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      changePage () {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        this.tableData1 = this.mockTableData1();
      }
    }
  }
</script>
