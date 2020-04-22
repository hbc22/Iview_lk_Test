<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>

    <br>
    <div>
      <span>hahah</span>
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
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
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

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
