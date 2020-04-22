<template>
       <div>
      <el-table
                :data="dadaList"
                border
                style="width: 100%;"
                row-key="id">
        <el-table-column prop="name"
                         label="A"
                         header-align="center"
                         min-width="150"></el-table-column>
        <el-table-column prop="sort"
                         label="D"
                         header-align="center"
                         align="center"></el-table-column>
        <el-table-column prop="url"
                         label="E"
                         header-align="center"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作"
                         fixed="right"
                         header-align="center"
                         align="center"
                         width="150">
          <template slot-scope="scope">
            <el-button type="text"
                       size="medium"
                       @click="addOrUpdateHandle(scope.row.id)">更新</el-button>
            <el-button type="text"
                       size="medium"
                       @click="addOrUpdateHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
  data () {
    return {
            dadaList: [
        {
          "id": "1166274408218718209",
          "pid": "0",
          "name": "组织管理",
          "url": "",
          "type": 0,
          "icon": "icon-apartment",
          "permissions": "",
          "sort": 0,
          "createDate": "20190917160100",
          "parentName": null,
          "platformType": 1,
          "children": [{
            "id": "1166278792856039425",
            "pid": "1166274987863142402",
            "children": [],
            "name": "组织概述",
            "url": "org/dept/dept-calculate",
            "type": 0,
            "icon": "icon-linechart",
            "permissions": "",
            "sort": 0,
            "createDate": "20190827171827",
            "parentName": null,
            "platformType": 0
          }, {
            "id": "1166278946975739905",
            "pid": "1166274987863142402",
            "children": [],
            "name": "组织架构管理",
            "url": "org/dept/dept.vue",
            "type": 0,
            "icon": "icon-orderedlist",
            "permissions": "",
            "sort": 1,
            "createDate": "20190827171904",
            "parentName": null,
            "platformType": 0
          }]
        }
      ]
    }
  },
  methods: {
    addOrUpdateHandle (item) {
      console.log('111', item)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
