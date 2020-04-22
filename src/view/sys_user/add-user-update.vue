<template>
    <Modal v-model="showDialog" :title="title_status" @on-ok="ok" @on-cancel="cancel" id="user">
      <tabs type="card" :animated="false" class="user_tab">
        <tab-pane label="基本信息">
          <Form label-position="right" :label-width="80" style="margin-top: 20px">
            <FormItem label="用户名" >
              <Input v-model="dataForm.username" placeholder="请输入(不少于4个字符)" class="form_wid" />
            </FormItem>
            <FormItem label="密码" >
              <Input v-model="dataForm.password" type="password" placeholder="密码" class="form_wid" />
            </FormItem>
            <FormItem label="确认密码" >
              <Input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码" class="form_wid" />
            </FormItem>
            <FormItem label="真实姓名" >
              <Input v-model="dataForm.realName" placeholder="真实姓名" class="form_wid" />
            </FormItem>
            <FormItem label="性别" >
              <RadioGroup v-model="dataForm.gender">
                <Radio label="0">男</Radio>
                <Radio label="1">女</Radio>
                <Radio label="2">保密</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="邮箱" >
              <Input v-model="dataForm.email" placeholder="邮箱" class="form_wid" />
            </FormItem>
            <FormItem label="手机号" >
              <Input v-model="dataForm.mobile" placeholder="手机号" class="form_wid" />
            </FormItem>
            <FormItem label="状态" >
              <RadioGroup v-model="dataForm.status">
                <Radio label="0">停用</Radio>
                <Radio label="1">正常</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </tab-pane>
        <tab-pane label="权限">
          <Form label-position="right" :label-width="80" style="margin-top: 20px">
            <FormItem label="角色配置" class="qx_pb">
              <i-select v-model="dataForm.RolueId">
                <i-option v-for="item in checkRose" :value="item.value" :key="item.value">{{ item.label }}</i-option>
              </i-select>
            </FormItem>
          </Form>
        </tab-pane>
      </tabs>
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
        username: '',
        password: '',
        comfirmPassword: '',
        realName: '',
        gender: '0',
        email: '',
        mobile: '',
        status: '1',
        orgId: '0',
        org: '',
        RolueId: ''
      },
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
      }, 2000)
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
#user .user_tab .ivu-modal {
    width: 600px!important
}
#user .form_wid, #user .ivu-select, #user .ivu-input-wrapper {
    width: 300px
}
#user .ivu-tabs {
  box-shadow: none;
  border: none
}
#user .ivu-tabs-bar {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
}
#user .ivu-modal-body {
  width: 80%;
  margin: 0 auto;
}
#user .user_tab .ivu-form-item {
  margin-bottom: 10px
}
#user .ivu-poptip-inner {
    position: fixed;
    width: 30%
}
#user .qx_pb .ivu-form-item-content {
  position: fixed;
}
</style>
