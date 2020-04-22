import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
import { mockMenuData } from './data/menus-data'
const Random = Mock.Random

export const getMockMenuData = req => {
  return mockMenuData
}

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}

export const getTableOrgData = req => {
  let tableOrgData = []
  doCustomTimes(4, () => {
    tableOrgData.push(Mock.mock({
      'name|1': ['华虹集团', '上海华虹(集团)责任有限公司', '上海华虹宏力半导体制造有限公司工会', '上海集成电路研发公司工会', '华虹篮球协会'],
      'unitname|1': ['华虹集团', '上海华虹(集团)责任有限公司', '上海华虹宏力半导体制造有限公司工会', '上海集成电路研发公司工会', '华虹篮球协会'],
      'organizationCode': /\d{5,10}/,
      address: Mock.mock('@county(true)'),
      'mobile|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
      postCode: '@zip',
      'categroyData|1': ['0', '1'],
      email: '@email'
    }))
  })
  return tableOrgData
}

export const getTableDeptData = req => {
  let tableDeptData = []
  doCustomTimes(4, () => {
    tableDeptData.push(Mock.mock({
      name: '@cname',
      'sex|1': ['男', '女'],
      'mobile|1': ['135****4954', '136****0649', '158****2420', '159****0612'],
      certificateNum: '@id',
      'certificateType|1': ['0', '1'],
      birthday: '@date',
      'workUnit|1': ['上海华虹'],
      'deptName|1': ['上海华虹'],
      'marriage|1': ['已婚', '未婚'],
      'nation|1': ['汉族', '其他'],
      'politicalStatus|1': ['团员', '党员'],
      'education|1': ['博士', '硕士'],
      'technologyLevel|1': ['一级', '二级'],
      'memberCard|1': ['2312345678', '3421360649', '4321582420', '5421590612'],
      'household|1': ['农业户口', '非农业户口'],
      domicile: '@province',
      nativePlace: '@city',
      'workSituation|1': ['在岗', '失业'],
      'monthlySum|1': ['1w-2w', '2w-3w'],
      'hobby|1': ['读书', '健身'],
      'unionSpec|1': ['普通职工', '特殊职工'],
      'memberChange|1': ['入会', '转出'],
      'memberChangeReason|1': ['失业', '个人要求'],
      memberChangeDate: '@date',
      id: Random.increment(100)

    }))
  })
  return tableDeptData
}

export const getTableUsertData = req => {
  let tableUserData = []
  doCustomTimes(4, () => {
    tableUserData.push(Mock.mock({
      username: '@name',
      realName: '@cname',
      'deptName|1': ['华宏总工会', '华宏协会总工会'],
      'gender|1': ['0', '1', '2'],
      'RolueId|1': ['0', '1'],
      'password|1': ['......'],
      'comfirmPassword|1': ['......'],
      email: '@email',
      'mobile|1': ['135****4954', '136****0649', '158****2420', '159****0612'],
      'status|1': ['停用', '正常', '待激活'],
      createDate: '@date'
    }))
  })
  return tableUserData
}

export const getTableRoletData = req => {
  let tableRoleData = []
  doCustomTimes(4, () => {
    tableRoleData.push(Mock.mock({
      'name|1': ['系统设置', '管理员'],
      'remark|1': ['系统设置', '管理员'],
      createDate: '@datetime'
    }))
  })
  return tableRoleData
}

export const getTableColumnData = req => {
  let tableColumnData = []
  // var zip = Random.zip()
  doCustomTimes(5, () => {
    tableColumnData.push(Mock.mock({
      id: '@id',
      title: '@title',
      publishTime: '2019-12-18 14:31',
      user: 'admin'
    }
    ))
  })
  return tableColumnData
}

export const getTreeColumnData = req => {
  let tableTreeData = []
  // var zip = Random.zip()
  doCustomTimes(1, () => {
    tableTreeData.push(Mock.mock({
      id: '@id',
      title: '政策宣传',
      expand: true,
      children: [
        {
          id: '@id',
          title: '劳模工匠',
          expand: true,
          children: [
            {
              id: '@id',
              title: 'leaf 1-1-1'
            },
            {
              id: '@id',
              title: 'leaf 1-1-2'
            }
          ]
        },
        {
          id: '@id',
          title: '网站首页',
          expand: true,
          children: [
            {
              id: '@id',
              title: 'leaf 1-2-1'
            },
            {
              id: '@id',
              title: '政策法规'
            }
          ]
        },
        {
          id: '@id',
          title: '联席服务'
        },
        {
          id: '@id',
          title: '征文投稿'
        }
      ]
    }
    ))
  })
  return tableTreeData
}
