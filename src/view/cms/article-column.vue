<template>
  <Card>
    <Row style="display: flex;width: 100%">
      <div style="margin-right: 10px; width: 25%;">
        <Card>
          <Input v-model="searchValue" placeholder="搜索" clearable />
          <Tree :data="treeList" :render="renderContent" ref="mytree"></Tree>
        </Card>
      </div>

      <div style="width: 75%">
        <Card style="overflow: hidden">
          <Row style="margin-bottom: 10px">
            <Breadcrumb separator=">">
              <BreadcrumbItem v-for="cate in selectedCategoryPath" :key="cate.id">{{cate.title}}</BreadcrumbItem>
            </Breadcrumb>
          </Row>

          <Row>
            <i-button type="primary" style="margin-right: 10px" @click="addOrUpdateHandle(false)">新增</i-button>
            <i-button type="warning" style="margin-right: 10px" @click="addOrUpdateHandle(true)">修改</i-button>
            <i-button type="error" @click="showDeleteModal">删除</i-button>
          </Row>

          <br />

          <i-table border :columns="columns" :data="dataList"></i-table>

          <Page
            :total="total"
            :current="currentPage"
            :page-size="10"
            size="small"
            show-total
            show-elevator
            show-sizer
            style="float: right; margin: 20px 0;"
          ></Page>
        </Card>
      </div>
    </Row>

    <!-- 新增/修改弹窗 -->
    <add-or-update
      ref="addOrUpdate"
      :isShowModal="isShowModal"
      :isEditMode="isEditMode"
      :category="selectedCategory"
      @dialogOK="okHandle"
      @cancel="isShowModal = false"
    ></add-or-update>

    <!-- 删除弹窗 -->
    <Modal v-model="deleteModal" width="300">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>确认删除</span>
      </p>
      <div style="text-align:center">
        <p>您确定要删除该栏目吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <Button @click="deleteModal = false">取消</Button>
        <Button type="error" @click="deleteHandle">确定</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import AddOrUpdate from '@/view/cms/column-add-or-update'
import { getTableColumnData, getTreeColumnData } from '@/api/data.js'

export default {
  components: { AddOrUpdate },

  data () {
    return {
      currentPage: 1,
      total: 30,
      id: '',
      isShowModal: false,
      deleteModal: false,
      searchValue: '',
      selectedCategory: null,
      selectedCategoryPath: [],
      isEditMode: false,
      treeList: [],
      treeChild2Parent: {},
      columns: [
        {
          title: '栏目ID',
          key: 'id',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '栏目标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '创建者',
          key: 'user',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'publishTime',
          align: 'center'
        }
      ],
      dataList: [
        {
          id: '1206454978562961409',
          title: '工作专题',
          publishTime: '2019-12-06 14:31',
          user: 'admin'
        }
      ]
    }
  },
  created () {},
  async mounted () {
    const res1 = await getTreeColumnData()
    console.log('树数据', res1)
    this.treeList = res1.data
    this.rebuildTreeChild2Parent()

    const res2 = await getTableColumnData()
    console.log('表格数据', res2)
    this.dataList = res2.data
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
    // 显示新增/修改弹框
    addOrUpdateHandle (isEditMode) {
      if (this.selectedCategory) {
        this.isShowModal = true
        this.isEditMode = isEditMode
      } else {
        this.$Message.error('请选择父级栏目')
      }
    },
    // 弹出删除弹框
    showDeleteModal () {
      if (!this.selectedCategory) {
        return this.$Message.error('请选择要删除的栏目')
      }
      this.deleteModal = true
    },
    // 删除处理
    deleteHandle () {
      this.deleteModal = false
    },
    // 确定处理
    okHandle (data) {
      console.log('修改data', data.newTitle)
      // 校验 请求api...
      this.$refs.addOrUpdate.$refs.myform.validate(valid => {
        if (valid) {
          if (!this.isEditMode) {
            this.append(data.category, data.newTitle)
          }
          this.isShowModal = false
          this.$refs.addOrUpdate.loading = false
          this.$refs.addOrUpdate.$refs.myform.resetFields()
        } else {
          this.$nextTick(() => {
            this.$Message.error('请输入要添加的栏目标题')
            this.$refs.addOrUpdate.loading = false
          })
        }
      })
    },
    // 新增树节点
    append (data, title) {
      const children = data.children || []
      children.push({
        title,
        expand: true
      })
      this.$set(data, 'children', children)
    },
    // 自定义树节点内容
    renderContent (h, { root, node, data }) {
      const subContent = [
        h(
          'span',
          {
            class: data.selected
              ? 'ivu-tree-title ivu-tree-title-selected'
              : 'ivu-tree-title',
            on: {
              click: () => {
                this.selectedCategory = data
                this.selectedCategoryPath = this.getSelectedCategoryPath()
                const selectedNodes = this.$refs.mytree.getSelectedNodes()
                // console.log("selected--->", this.selectedCategory);

                for (let snode of selectedNodes) {
                  this.$set(snode, 'selected', false)
                }
                this.$set(data, 'selected', true)
                // console.log("title", this.selectedCategory.title);
              }
            }
          },
          data.title
        )
      ]
      return h('span', subContent)
    }
  }
}
</script>

<style scoped>
.ivu-tree-title {
  display: inline-block;
  margin: 0;
  padding: 0 4px;
  border-radius: 3px;
  cursor: pointer;
  vertical-align: top;
  color: #515a6e;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>
