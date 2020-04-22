import { getTableDeptData, getTableOrgData, getOrgTable, getTableUsertData, getTableRoletData } from '@/api/data'
export default {
  data () {
    return {
      mixinViewModuleOptions: {
        activatedIsNeed: true,
        deleteIsBatch: false,
        deleteIsBatchKey: 'id',
        getDataListURL: ''
      },
      dataForm: {},
      dataList: [],
      page: 1,
      limit: 5,
      total: 0,
      dataListSelections: []
    }
  },
  activated () {
    if (this.mixinViewModuleOptions.activatedIsNeed) {
      console.log('1212')
      this.getDataList()
    }
  },
  methods: {
    getDataList () {
      console.log(33)
      if (this.mixinViewModuleOptions.getDataListURL === 'getTableDeptData') {
        getTableDeptData().then(res => {
          if (res.status !== 200) {
            this.dataList = []
            this.total = 0
            return this.$Message.error(res.msg)
          }
          this.dataList = res.data
          this.total = this.dataList.length
        })
      }

      if (this.mixinViewModuleOptions.getDataListURL === 'getTableOrgData') {
        getTableOrgData().then(res => {
          console.log('14', res)
          if (res.status !== 200) {
            this.dataList = []
            this.total = 0
            return this.$Message.error(res.msg)
          }
          this.dataList = res.data
          this.total = this.dataList.length
        })
      }

      if (this.mixinViewModuleOptions.getDataListURL === 'getTableUsertData') {
        getTableUsertData().then(res => {
          if (res.status !== 200) {
            this.dataList = []
            this.total = 0
            return this.$Message.error(res.msg)
          }
          this.dataList = res.data
          this.total = this.dataList.length
        })
      }

      if (this.mixinViewModuleOptions.getDataListURL === 'getTableRoletData') {
        getTableRoletData().then(res => {
          if (res.status !== 200) {
            this.dataList = []
            this.total = 0
            return this.$Message.error(res.msg)
          }
          this.dataList = res.data
          this.total = this.dataList.length
        })
      }
    },
    deleteHandle (id) {
      if (this.mixinViewModuleOptions.deleteIsBatch && !id && this.dataListSelections.length <= 0) {
        return this.$Message.warning({
          content: '请选择删除项',
          duration: 2
        })
      }
      this.$Modal.confirm({
        title: '提示',
        content: '确定进行[删除]操作?',
        onOk: () => {
          this.$Message.warning('操作成功')
          this.getDataList()
        }
      })
    },
    dataListSelectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 页码改变的回调，返回改变后的页码
    pageSizeChangeHandle (val) {
      console.log('310', val)
      this.page = 1
      this.limit = val
    },
    // 切换每页条数时的回调，返回切换后的每页条数
    pageCurrentChangeHandle (val) {
      console.log('3101', val)
    }
  }
}
