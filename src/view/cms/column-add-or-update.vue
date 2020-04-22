<template>
  <Modal v-model="showDialog" :loading="loading" :title="dialogTitle" @on-ok="ok" @on-cancel="cancel">
    <Form label-position="right" :model="dataForm" ref="myform" :label-width="80" :rules="ruleValidate">
      <FormItem label="栏目标题" prop="title">
        <Input v-model="dataForm.title" placeholder="栏目标题" style="width: 300px" clearable />
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
    category: {
      type: Object,
      default: () => ({})
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ruleValidate: {
        title: [
          { required: true, message: '请输入栏目标题', trigger: 'blur' }
        ]
      },
      showDialog: false,
      loading: true,
      dataForm: {
        title: ''
      }
    }
  },
  watch: {
    isShowModal (newVal) {
      this.showDialog = newVal
      if (this.isEditMode && this.category && this.category.id) {
        this.dataForm.title = this.category.title
        console.log(1)
      } else {
        this.dataForm.title = ''
        console.log(2)
      }
    }
  },
  computed: {
    dialogTitle () {
      return this.isEditMode ? '修改' : '新增'
    }
  },
  methods: {
    ok () {
      this.$emit('dialogOK', {
        category: this.category,
        newTitle: this.dataForm.title
      })
      this.dataForm = {}
    },
    cancel () {
      this.$emit('cancel')
      this.dataForm = {}
    }
  }
}
</script>

<style scoped>
</style>
