<template>
  <div id="org-container">
    <Card>
      <Row>
        <i-col :span="7">
          <Card>
                <Input v-model="filterText" placeholder="搜索" @on-blur="showIt" clearable />
                <Tree :data="treeList" :render="renderContent" ref="tree"></Tree>
          </Card>
        </i-col>
        <i-col :span="16" offset="0" style="margin-left: 20px;width: 68.5%">
          <Card>
                <Row>
                  <i-col span="24">
                    <div style="padding: 10px 0">
                      <Breadcrumb separator=">">
                        <BreadcrumbItem v-for="cate in selectedCategoryPath" :key="cate.id">{{cate.title}}</BreadcrumbItem>
                      </Breadcrumb>
                    </div>
                  </i-col>
                  <i-col span="12">
                    <i-button size="large" type="primary" style="margin-right: 10px" @click="addHandle">添加组织</i-button>
                    <!-- <i-button size="large" type="error" @click="deleteHandle">删除组织</i-button> -->
                    <i-button size="large" type="error">删除组织</i-button>
                  </i-col>
                </Row>
                <div style="margin-top: 10px">
                  <Table border ref="selection" :columns="columns4" :data="dataList"></Table>
                </div>
                <Page
                  :total="total"
                  :current="currentPage"
                  :page-sizes-opts="[10, 20, 50, 100]"
                  :page-size="limit"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer
                  @on-change="pageSizeChangeHandle"
                  @on-page-size-change="pageCurrentChangeHandle"
                  style="margin-top: 15px;text-align: right;"
                ></Page>
            </Card>
        </i-col>
      </Row>
    </Card>
    <add-or-update ref="addOrUpdateModal" :title_status="title_status" :selectedCategoryPath="selectedCategoryPath" :isShowModal="isShowModal" @dialogOK="submitHandle" @cancel="isShowModal = false" :data_add_update="data_add_update"></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from './add-org-update'
import { getOrgTree } from '@/api/data'
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  components: {
    AddOrUpdate
  },
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListIsPage: true,
        deleteIsBatch: true,
        getDataListURL: 'getTableOrgData'
      },
      filterText: '',
      selectedCategoryPath: [],
      selectedCategory: null,
      title_status: '查看',
      total: 0,
      currentPage: 1,
      limit: 10,
      data_add_update: {},
      treeChild2Parent: {},
      isShowModal: false,
      treeList: [],
      columns4: [
        {
          title: '组织名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '单位名称',
          key: 'unitname',
          align: 'center'
        },
        {
          title: '组织代码',
          key: 'organizationCode',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'mobile',
          align: 'center'
        },
        {
          title: '邮编',
          key: 'postCode',
          align: 'center'
        },
        {
          title: '电子邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.updateHandle(params)
                  }
                }
              }, '修改')
            ])
          }
        }
      ],
      tableOrgData: []
    }
  },
  async mounted () {
    this.rebuildTreeChild2Parent()
    getOrgTree().then((res) => {
      console.log('1212', res)
      if (res.data.code !== 1) {
        return this.$Message.warning(res.data.msg)
      }
      this.treeList = res.data.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    rebuildTreeChild2Parent () {
      this.treeChild2Parent = {}
      this.buildTreeMapping(this.treeList)
    },
    buildTreeMapping (nodes, parent) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const children = node.children || []
        if (parent) {
          this.treeChild2Parent[node.id] = parent
        }
        if (children.length > 0) {
          this.buildTreeMapping(children, node)
        }
      }
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
    updateHandle (item) {
      this.title_status = '修改'
      this.isShowModal = true
      this.data_add_update = item.row
    },
    showIt () {
      if (!this.filterText) return true
      this.treeList.filter((item, index) => {
      })
    },
    getParentNodeData (node, path) {
      const parent = this.treeChild2Parent[node.id]
      path.unshift(node)
      if (parent) {
        this.getParentNodeData(parent, path)
      }
    },
    getSelectedCategoryPath () {
      const path = []
      if (this.selectedCategory) {
        this.getParentNodeData(this.selectedCategory, path)
      }
      return path
    },
    renderContent (h, { root, node, data }) {
      const orgType = data.orgType
      const subContent = [h('span', {
        class: data.selected
          ? 'ivu-tree-title ivu-tree-title-selected'
          : 'ivu-tree-title',
        on: {
          click: () => {
            this.selectedCategory = data
            this.selectedCategoryPath = this.getSelectedCategoryPath()
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
          subContent.unshift(h('img', { attrs: { src: require('@/assets/icons/img/six.png'), class: 'icon' } }))
          break
        case 2:
          subContent.unshift(h('img', { attrs: { src: require('@/assets/icons/img/three.png'), class: 'icon' } }))
          break
      }
      return h('span', subContent)
    }
  }
}
</script>

<style lang="less">
#org-container {
  height: 100%;
}
#org-container .ivu-tree ul li span .icon {
  width: 32px;
  height: 16px;
  margin: 3px;
  vertical-align: middle;
}
#org-container .ivu-tree ul li span span {
  cursor: pointer;
}
#org-container .ivu-col-span-4 {
  width: 14%
}
</style>
