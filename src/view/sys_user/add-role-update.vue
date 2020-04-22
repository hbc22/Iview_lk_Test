<template>
    <Modal v-model="showDialog" :title="title_status" @on-ok="ok" @on-cancel="cancel" id="role">
      <Form label-position="right" :label-width="80" style="margin-top: 20px">
        <FormItem label="名称: " >
          <Input v-model="dataForm.name" placeholder="请输入" class="form_wid" />
        </FormItem>
        <FormItem label="备注: " >
          <Input v-model="dataForm.remark" placeholder="请输入" class="form_wid" />
        </FormItem>
        <FormItem label="菜单授权: " >
          <Tree :data="treeList" show-checkbox :render="renderContent" ref="tree"></Tree>
        </FormItem>
        </Form>
    </Modal>
</template>

<script>
export default {
  name: 'add-user-update',
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
    title_status: {
      type: String
    },
    currentOrg: {
      type: String
    },
    data_add_update: {
      type: Object
    }
  },
  data () {
    return {
      showDialog: false,
      visible: false,
      categroyData: '',
      dataForm: {
        name: '',
        remark: ''
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
                  orgType: 2
                },
                {
                  title: 'leaf 1-1-2',
                  orgType: 2
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
                  orgType: 2
                },
                {
                  title: 'leaf 1-2-1',
                  orgType: 2
                }
              ]
            },
            {
              orgType: 2,
              title: '上海集成电路研发公司工会'
            },
            {
              orgType: 2,
              title: '华虹篮球协会'
            }
          ]
        }
      ],
      categroyList: [
        {
          value: '0',
          label: '居民身份证'
        },
        {
          value: '1',
          label: '护照'
        },
        {
          value: '2',
          label: '其他'
        }
      ],
      sexList: [
        {
          value: '0',
          label: '女'
        },
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '保密'
        }
      ],
      checkRose: [
        {
          value: '0',
          label: '系统设置'
        },
        {
          value: '1',
          label: '管理员'
        }
      ]
    }
  },
  mounted () {
  },
  watch: {
    isShowModal (newVal) {
      this.showDialog = newVal
    },
    title_status (val) {
      if (val === '新增') {
        this.dataForm = {}
      }
    },
    data_add_update (val) {
      if (this.title_status === '修改') {
        this.dataForm = val
      }
    }
  },
  methods: {
    ok () {
      this.$emit('dialogOK')
      this.modal_loading = true
      setTimeout(() => {
        this.$Message.success('操作成功')
      }, 2000)
    },
    cancel () {
      this.$emit('cancel')
    },
    init () {
      this.showDialog = true
    },
    renderContent (h, { root, node, data }) {
      const subContent = [h('span', {
        on: {
          click: () => {
            // this.dataForm.org = data.title
            alert('123')
          }
        }
      },
      data.title)]
      return h('span', subContent)
    }
  }
}
</script>

<style lang="less">
#role .ivu-tree {
  margin-top: -8px
}
</style>
