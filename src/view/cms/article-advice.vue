<template>
  <div id="advice-container">
    <Card>
      <Row style="display: flex; width: 100%">
        <div style="margin-right: 10px; width: 20%;">
          <Card>
            <Input v-model="searchValue" placeholder="搜索" clearable />
            <Tree :data="treeList" ref="mytree"></Tree>
          </Card>
        </div>

        <div style="width: 80%">
          <Card>
            <Row>
              <i-button
                type="primary"
                style="margin-right: 10px"
                @click="addOrUpdateHandle(false)"
              >新增</i-button>
              <i-button type="success" style="margin-right: 10px" @click="publishNews">发布</i-button>
              <i-button type="warning" style="margin-right: 10px" @click="downNews">下架</i-button>
              <i-button type="error" style="margin-right: 10px" @click="showDeleteModal">删除</i-button>
            </Row>

            <br />

            <Row style="display: flex">
              <div class="mr-10">
                <i-input
                  placeholder="资讯标题"
                  style="width: 200px"
                  :maxlength="50"
                  :value.sync="title"
                  clearable
                ></i-input>
              </div>

              <div class="mr-10">
                <i-select
                  :model.sync="selectedValue"
                  style="width:200px"
                  placeholder="审核状态"
                  clearable
                >
                  <i-option
                    v-for="item in checkStatusList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</i-option>
                </i-select>
              </div>

              <div class="mr-10">
                <Date-picker
                  type="daterange"
                  placement="bottom-end"
                  placeholder="选择日期"
                  style="width: 200px"
                ></Date-picker>
              </div>

              <div>
                <i-button style="margin-right: 10px">查询</i-button>
              </div>
            </Row>
            <br />

            <i-table
              highlight-row
              border
              :columns="columns"
              :data="dataList"
              @on-selection-change="handleSelectionChange"
            ></i-table>
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
    </Card>
    <!-- 删除弹窗 -->
    <Modal v-model="deleteModal" width="300">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>确认删除</span>
      </p>
      <div style="text-align:center">
        <p>您确定要删除该条资讯？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <Button @click="deleteModal = false">取消</Button>
        <Button type="error" @click="deleteHandle">确定</Button>
      </div>
    </Modal>

    <!-- 新增/修改弹窗 -->
    <add-or-update
      ref="addOrUpdate"
      :isShowModal="isShowModal"
      :isEditMode="isEditMode"
      @dialogOK="okHandle"
      @cancel="isShowModal = false"
    ></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from '@/view/cms/news-add-or-update'
import { getTreeColumnData } from '@/api/data.js'

export default {
  components: {
    AddOrUpdate
  },
  data () {
    return {
      total: 30,
      currentPage: 1,
      isShowModal: false,
      isEditMode: false,
      deleteModal: false,
      searchValue: '',
      title: '',
      selectedValue: '',
      dataListSelections: [],
      treeList: [],
      checkStatusList: [
        {
          value: '0',
          label: '审核中'
        },
        {
          value: '1',
          label: '已发布'
        },
        {
          value: '2',
          label: '已驳回'
        }
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center',
          width: 150
        },
        {
          title: '分类',
          key: 'type',
          align: 'center'
        },
        {
          title: '发布状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '置顶',
          key: 'top',
          align: 'center'
        },
        {
          title: '浏览量',
          key: 'views',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'publishTime',
          align: 'center',
          width: 180
        },
        {
          title: '发布人',
          key: 'user',
          align: 'center'
        },
        {
          title: '所属栏目',
          key: 'categroy',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  class: 'btn-action btn-action-modify',
                  on: {
                    click: () => {
                      this.addOrUpdateHandle(true, params.row.id)
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ],
      dataList: [
        {
          title: '工会法人资格证办理',
          type: '图文',
          status: '已发布',
          top: 0,
          views: 90,
          publishTime: '2019-12-06 14:31',
          user: '管理员',
          categroy: '法律法规'
        }
      ]
    }
  },
  mounted () {
    getTreeColumnData().then(res => {
      console.log('树数据', res)
      this.treeList = res.data
    })
  },
  methods: {
    handleSelectionChange (val) {
      console.log('选项数据', val)
      this.dataListSelections = val
    },
    // 显示新增/修改弹窗
    addOrUpdateHandle (isEditMode, id) {
      console.log('id', id)

      this.isShowModal = true
      this.isEditMode = isEditMode
    },

    // 新增/修改逻辑
    okHandle () {},

    publishNews () {
      if (this.dataListSelections.length === 0) {
        return this.$Message.warning('请选择发布项')
      }

      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定进行[发布]操作吗？</p>',
        onOk: () => {
          this.$Message.success('发布成功')
        },
        onCancel: () => {
          this.$Message.warning('取消发布')
        }
      })
      // 请求接口
    },
    downNews () {
      if (this.dataListSelections.length === 0) {
        return this.$Message.warning('请选择下架项')
      }
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定进行[下架]操作吗？</p>',
        onOk: () => {
          this.$Message.success('下架成功')
        },
        onCancel: () => {
          this.$Message.warning('取消下架')
        }
      })
    },
    // 显示删除弹窗
    showDeleteModal () {
      if (this.dataListSelections.length === 0) {
        return this.$Message.error('请选择批量删除的项')
      }
      this.deleteModal = true
    },
    deleteHandle () {
      this.deleteModal = false
    }
  }
}
</script>

<style scoped>
.btn-action {
  margin: 10px;
}
.mr-10 {
  margin-right: 10px;
}
#advice-container {
  height: 100%;
}
#advice-container .ivu-card-bordered {
  height: 100%;
}
</style>
