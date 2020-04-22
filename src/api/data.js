import axios from '@/libs/api.request'

export const getMockMenuData = () => {
  return axios.request({
    url: 'get_mock_menu_data',
    method: 'post'
  })
}

export const getOrgTree = () => {
  return axios.request({
    url: 'organization/getOrgTree',
    method: 'get'
  })
}

export const getOrgTable = () => {
  return axios.request({
    url: 'organization/getOrgTable',
    method: 'get'
  })
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

export const getTableOrgData = () => {
  return axios.request({
    url: 'get_table_org_data',
    method: 'get'
  })
}

export const getTableDeptData = () => {
  return axios.request({
    url: 'get_table_dept_data',
    method: 'get'
  })
}

export const getTableUsertData = () => {
  return axios.request({
    url: 'get_table_user_data',
    method: 'get'
  })
}

export const getTableColumnData = () => {
  return axios.request({
    url: 'get_table_column_data',
    method: 'get'
  })
}

export const getTreeColumnData = () => {
  return axios.request({
    url: 'get_tree_column_data',
    method: 'get'
  })
}

export const getTableRoletData = () => {
  return axios.request({
    url: 'get_tree_role_data',
    method: 'get'
  })
}
