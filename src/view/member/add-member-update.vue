<template>
    <Modal v-model="showDialog" :title="title_status" @on-ok="ok" @on-cancel="cancel" id="member">
      <tabs type="card" :animated="false">
        <tab-pane label="基本信息">
          <Form label-position="right" :label-width="80" style="margin-top: 20px">
            <FormItem label="姓名" >
              <Input v-model="dataForm.name" placeholder="姓名" class="form_wid" />
            </FormItem>
            <FormItem label="手机" >
              <Input v-model="dataForm.mobile" placeholder="手机" class="form_wid" />
            </FormItem>
            <FormItem label="证件类型" >
              <i-select v-model="dataForm.certificateType">
                  <i-option v-for="item in categroyList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
              </i-select>
            </FormItem>
            <FormItem label="证件号码" >
              <Input v-model="dataForm.certificateNum" placeholder="证件号码" class="form_wid" />
            </FormItem>
            <FormItem label="性别" >
              <i-select v-model="dataForm.sex">
                <i-option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
              </i-select>
            </FormItem>
            <FormItem label="出生日期" >
              <DatePicker type="date" v-model="dataForm.birthday" placeholder="出生日期"></DatePicker>
            </FormItem>
            <FormItem label="工作单位" >
              <Input v-model="dataForm.workUnit" placeholder="工作单位" class="form_wid" />
            </FormItem>
            <FormItem label="所在工会" >
              <Input v-model="dataForm.deptName" placeholder="所在工会" class="form_wid" />
            </FormItem>
          </Form>
        </tab-pane>
        <tab-pane label="户籍身份及学历">
          <Form label-position="right" :label-width="80" style="margin-top: 20px">
            <FormItem label="婚姻状况" >
              <Input v-model="dataForm.marriage" placeholder="婚姻状况" class="form_wid" />
            </FormItem>
            <FormItem label="民族" >
              <Input v-model="dataForm.nation" placeholder="民族" class="form_wid" />
            </FormItem>
            <FormItem label="政治面貌" >
              <Input v-model="dataForm.politicalStatus" placeholder="政治面貌" class="form_wid" />
            </FormItem>
            <FormItem label="最高学历" >
              <Input v-model="dataForm.education" placeholder="最高学历" class="form_wid" />
            </FormItem>
            <FormItem label="技术等级" >
              <Input v-model="dataForm.technologyLevel" placeholder="技术等级" class="form_wid" />
            </FormItem>
            <FormItem label="会员卡号" >
              <Input v-model="dataForm.memberCard" placeholder="会员卡号" class="form_wid" />
            </FormItem>
            <FormItem label="户籍" >
              <Input v-model="dataForm.household" placeholder="户籍" class="form_wid" />
            </FormItem>
            <FormItem label="户籍所在地" >
              <Input v-model="dataForm.domicile" placeholder="户籍所在地" class="form_wid" />
            </FormItem>
            <FormItem label="籍贯" >
              <Input v-model="dataForm.nativePlace" placeholder="籍贯" class="form_wid" />
            </FormItem>
          </Form>
        </tab-pane>
        <tab-pane label="其他">
          <Form label-position="right" :label-width="80" style="margin-top: 20px">
            <FormItem label="就业状况" >
              <Input v-model="dataForm.workSituation" placeholder="就业状况" class="form_wid" />
            </FormItem>
            <FormItem label="月收入" >
              <Input v-model="dataForm.monthlySum" placeholder="月收入" class="form_wid" />
            </FormItem>
            <FormItem label="爱好" >
              <Input v-model="dataForm.hobby" placeholder="爱好" class="form_wid" />
            </FormItem>
            <FormItem label="工会特殊项标识" >
              <Input v-model="dataForm.unionSpec" placeholder="工会特殊项标识" class="form_wid" />
            </FormItem>
            <FormItem label="会籍变化类型" >
              <Input v-model="dataForm.memberChange" placeholder="会籍变化类型" class="form_wid" />
            </FormItem>
            <FormItem label="会籍变化原因" >
              <Input v-model="dataForm.memberChangeReason" placeholder="会籍变化原因" class="form_wid" />
            </FormItem>
            <FormItem label="会籍变化日期" >
              <Input v-model="dataForm.memberChangeDate" placeholder="会籍变化日期" class="form_wid" />
            </FormItem>
          </Form>
        </tab-pane>
      </tabs>
    </Modal>
</template>

<script>
export default {
  name: 'add-member-update',
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
      categroyData: '',
      dataForm: {
        name: '',
        mobile: '',
        certificateType: '',
        certificateNum: '',
        sex: '',
        birthday: '',
        workUnit: '',
        deptName: '',
        marriage: '',
        nation: '',
        politicalStatus: '',
        education: '',
        technologyLevel: '',
        memberCard: '',
        household: '',
        domicile: '',
        nativePlace: '',
        workSituation: '',
        monthlySum: '',
        hobby: '',
        unionSpec: '',
        memberChange: '',
        memberChangeReason: '',
        memberChangeDate: ''
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
#member .ivu-modal {
    width: 600px!important
}
#member .form_wid, #member .ivu-select, #member .ivu-input-wrapper {
    width: 300px
}
#member .ivu-tabs {
  box-shadow: none;
  border: none
}
#member .ivu-tabs-bar {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
}
#member .ivu-modal-body {
  width: 80%;
  margin: 0 auto;
}
</style>
