<template>
    <Modal v-model="showDialog" :title="title_status" @on-ok="ok" @on-cancel="cancel" class="orgd">
      <Form label-position="right" :label-width="80">
          <div style="padding: 15px 20px">
              <Breadcrumb separator=">">
                <BreadcrumbItem v-for="cate in selectedCategoryPath" :key="cate.id">{{cate.title}}</BreadcrumbItem>
              </Breadcrumb>
          </div>
        <FormItem label="组织类型">
          <Select v-model="dataForm.categroyData" class="form_wid">
            <Option
              v-for="item in categroyList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="组织名称" >
          <Input v-model="dataForm.name" placeholder="组织名称" class="form_wid" />
        </FormItem>
        <FormItem label="单位名称" >
          <Input v-model="dataForm.unitname" placeholder="单位名称" class="form_wid" />
        </FormItem>
        <FormItem label="组织代码" >
          <Input v-model="dataForm.organizationCode" placeholder="组织代码" class="form_wid" />
        </FormItem>
        <FormItem label="地址" >
          <Input v-model="dataForm.address" placeholder="地址" class="form_wid" />
        </FormItem>
        <FormItem label="联系电话" >
          <Input v-model="dataForm.mobile" placeholder="地址" class="form_wid" />
        </FormItem>
        <FormItem label="邮编" >
          <Input v-model="dataForm.postCode" placeholder="地址" class="form_wid" />
        </FormItem>
        <FormItem label="电子邮箱" >
          <Input v-model="dataForm.email" placeholder="地址" class="form_wid" />
        </FormItem>
      </Form>
    </Modal>
</template>

<script>
export default {
  name: 'add-or-update',
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
    title_status: {
      type: String
    },
    selectedCategoryPath: {
      type: Array
    },
    data_add_update: {
      type: Object
    }
  },
  data () {
    return {
      showDialog: false,
      dataForm: {
        name: '',
        categroyData: '',
        unitname: '',
        organizationCode: '',
        address: '',
        mobile: '',
        postCode: '',
        email: ''
      },
      categroyList: [
        {
          value: '0',
          label: '工会'
        },
        {
          value: '1',
          label: '协会'
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
      if (this.title_status === '修改' || this.title_status === '查看') {
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
      }, 100)
    },
    cancel () {
      this.$emit('cancel')
    },
    init () {
      this.showDialog = true
    }
  }
}
</script>

<style lang="less">
.orgd .ivu-modal {
    width: 600px!important
}
.orgd .form_wid {
    width: 300px
}
.orgd .ivu-modal-body {
  width: 80%;
  margin: 0 auto;
}
</style>
