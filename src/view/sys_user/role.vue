<template>
  <div id="role-container">
    <Card>
      <Row style="display: flex">
        <Form ref="formInline" :model="dataForm" inline :label-width="65" class="mr-10" style="margin-left: -25px">
          <FormItem label="名称: ">
            <Input placeholder="请输入"></Input>
          </FormItem>
          <i-button style="margin-right: 10px">查询</i-button>
          <i-button type="primary" style="margin-right: 10px" @click="addHandle">新增</i-button>
        </Form>
      </Row>
      <i-table border :columns="columns" :data="dataList"></i-table>
      <Page
        :total="total"
        :current="page"
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
    <add-or-update :title_status="title_status" :isShowModal="isShowModal" @dialogOK="submitHandle" @cancel="isShowModal = false" :data_add_update="data_add_update"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './add-role-update'
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListIsPage: true,
        deleteIsBatch: true,
        getDataListURL: 'getTableRoletData'
      },
      title: '',
      model1: '',
      dataForm: {},
      isShowModal: false,
      title_status: '查看',
      data_add_update: {},
      tableRoleData: [],
      cityList: [
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
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createDate',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params)
                    }
                  },
                  class: 'btn-action btn-action-modify'
                },
                '修改'
              )
            ])
          }
        }
      ]
    }
  },
  methods: {
    pageSizeChangeHandle (val) {
      this.page = 1
      this.limit = val
    },
    pageCurrentChangeHandle (val) {
    },
    addHandle () {
      this.isShowModal = true
      this.title_status = '新增'
    },
    update (item) {
      this.title_status = '修改'
      this.isShowModal = true
      this.data_add_update = item.row
    },
    submitHandle () {
      this.isShowModal = false
    }
  },
  components: {
    AddOrUpdate
  }
}
</script>

<style lang="less">
#role-container .btn-action {
    margin: 10px;
}
#role-container .mr-10 {
    margin-right: 10px;
}
#role-container {
  height: 100%;
}
#role-container .ivu-card-bordered {
  height: 100%;
}
</style>
