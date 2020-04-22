<template>
  <div id="member-container">
    <Card>
      <Row>
        <i-col :span="7">
          <Card>
                <Input v-model="value" placeholder="搜索" clearable />
                <Tree :data="treeList" ref="tree" :render="renderContent"></Tree>
          </Card>
        </i-col>
        <i-col :span="16" offset="0" style="margin-left: 20px;width: 68.5%">
          <Tabs type="card">
                <TabPane label="会员列表">
                  <div style="padding: 10px">
                    <Form ref="formInline" @keyup.enter.native="getDataList()" :model="dataForm" inline :label-width="43">
                      <FormItem label="姓名">
                        <Input placeholder="姓名"></Input>
                      </FormItem>
                      <FormItem label="手机">
                        <Input placeholder="手机"></Input>
                      </FormItem>
                      <FormItem label="证件号码" class="zjh">
                        <Input placeholder="证件号码"></Input>
                      </FormItem>
                      <FormItem label="性别">
                        <Input placeholder="性别"></Input>
                      </FormItem>
                      <FormItem label="学历">
                        <Input placeholder="学历"></Input>
                      </FormItem>
                      <FormItem label="包含下级" class="zjh">
                        <Input placeholder="包含下级"></Input>
                      </FormItem>
                      <Row>
                        <i-col span="12">
                          <i-button style="margin-right: 10px;margin-left: 5px">查询</i-button>
                          <i-button type="primary" style="margin-right: 10px" @click="addHandle">新增</i-button>
                          <i-button type="error" style="margin-right: 10px" @click="deleteHandle()">删除</i-button>
                          <!-- <i-button type="primary" style="margin-right: 10px">导入</i-button> -->
                          <!-- <i-button type="primary" style="margin-right: 10px">转出</i-button> -->
                        </i-col>
                      </Row>
                    </Form>
                  </div>
                  <div style="padding: 15px">
                    <Table border ref="selection"
                           :columns="columns4"
                           :data="dataList"
                           @on-selection-change="dataListSelectionChangeHandle"
                    ></Table>
                  </div>
                  <Page
                    :total="total"
                    :current="page"
                    :page-size="limit"
                    size="small"
                    show-total
                    show-elevator
                    show-sizer
                    style="float: right; margin: 15px 20px;"
                    @on-change="pageSizeChangeHandle"
                    @on-page-size-change="pageCurrentChangeHandle"
                  ></Page>
                </TabPane>
                <TabPane label="会员概况">
                  <member-info-pane ref="calculate"></member-info-pane>
                </TabPane>
          </Tabs>
        </i-col>
      </Row>
    </Card>
    <add-or-update :title_status="title_status" :isShowModal="isShowModal" @dialogOK="submitHandle" @cancel="isShowModal = false" :data_add_update="data_add_update"></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from './add-member-update'
import MemberInfoPane from './member-info-pane'
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListIsPage: true,
        deleteIsBatch: true,
        getDataListURL: 'getTableDeptData'
      },
      value: '',
      isShowModal: false,
      showModal: false,
      data_add_update: {},
      title_status: '查看',
      dataForm: {
        education: '',
        mobile: '',
        certificateNum: '',
        memberRange: ''
      },
      treeList: [
        {
          title: '华虹集团',
          orgType: 1,
          expand: true,
          children: [
            {
              title: '上海华虹(集团)责任有限公司',
              expand: true,
              orgType: 1,
              children: [
                {
                  title: 'leaf 1-1-1',
                  orgType: 1
                },
                {
                  title: 'leaf 1-1-2',
                  orgType: 1
                }
              ]
            },
            {
              title: '上海华虹宏力半导体制造有限公司工会',
              expand: true,
              orgType: 1,
              children: [
                {
                  title: 'leaf 1-2-1',
                  orgType: 1
                },
                {
                  title: 'leaf 1-2-1',
                  orgType: 1
                }
              ]
            },
            {
              orgType: 1,
              title: '上海集成电路研发公司工会'
            },
            {
              orgType: 1,
              title: '华虹篮球协会'
            }
          ]
        }
      ],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '性别',
          key: 'sex',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobile',
          align: 'center'
        },
        {
          title: '证件',
          key: 'certificateNum',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.look(params)
                  }
                }
              }, '查看'),
              h('a', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.update(params)
                  }
                }
              }, '修改'),
              h('a', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteHandle(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data1: [
        {
          name: '李玲',
          sex: '女',
          mobile: '157****4134',
          ID: '3190****1234'
        },
        {
          name: '孙敏',
          sex: '女',
          mobile: '157****1789',
          ID: '3113****1234'
        }
      ]
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
      const orgType = data.orgType
      const subContent = [h('span', {
        class: data.selected
          ? 'ivu-tree-title ivu-tree-title-selected'
          : 'ivu-tree-title',
        on: {
          click: () => {
            const selectedNodes = this.$refs.tree.getSelectedNodes()
            for (let snode of selectedNodes) {
              this.$set(snode, 'selected', false)
            }
            this.$set(data, 'selected', true)
          }
        }
      },
      data.title)]
      switch (orgType) {
        case 1:
          subContent.unshift(h('img', { attrs: { src: require('@/assets/icons/img/three.png'), class: 'icon' } }))
          break
      }
      return h('span', subContent)
    },
    addHandle () {
      this.isShowModal = true
      this.title_status = '新增'
    },
    submitHandle () {
      this.isShowModal = false
    },
    look (item) {
      this.title_status = '查看'
      this.isShowModal = true
      this.data_add_update = item.row
    },
    update (item) {
      this.title_status = '修改'
      this.isShowModal = true
      this.data_add_update = item.row
    },
    asyncOK () {
      this.showModal = false
      this.$Message.info('操作成功')
      this.getList()
    }
  },
  components: {
    AddOrUpdate,
    MemberInfoPane
  }
}
</script>

<style lang="less">
#member-container {
  height: 100%;
}
#member-container .ivu-card-bordered {
  height: 100%;
}
#member-container .zjh .ivu-form-item-label {
  width: 60px!important
}
#member-container .zjh .ivu-form-item-content {
  margin-left: 60px!important
}
#member-container .ivu-tree ul li span .icon {
  width: 32px;
  height: 16px;
  margin: 3px;
  vertical-align: middle;
}
#member-container .m_l_1 {
  margin-left: 1%
}
#member-container .m_l_2 {
  margin-left: 2%
}
#member-container .ivu-tabs {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
#member-container .ivu-tabs-bar {
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    margin: 0;
}
#member-container .ivu-tabs-nav {
    white-space: nowrap;
    position: relative;
    float: left;
    z-index: 2;
}
#member-container .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    color: #3E8EF7!important;
    background-color: #fff;
    border: none;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
}
#member-container .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    margin: 0px 0px 0;
    border-radius: 0;
    color: #909399;
    transition: none
}
</style>
