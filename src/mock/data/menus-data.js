export const mockMenuData = [
  {
    path: 'haha',
    name: 'doc',
    'component': 'Main',
    meta: {
      title: '文档',
      'showAlways': 'true',
      icon: 'ios-book'
    },
    'children': [
      {
        'path': 'wen',
        'name': 'wen',
        'meta': {
          'icon': 'ios-infinite',
          'iframe': 'https://lison16.github.io/iview-admin-doc/#/',
          'title': '文文'
        },
        'component': 'org/org-member'
      }
    ]
  },
  {
    'path': '/org',
    'name': 'org',
    'meta': {
      'icon': 'ios-stats',
      'showAlways': 'true',
      'title': '工会组织管理'
    },
    'component': 'Main',
    'children': [
      {
        'path': '/org-member',
        'name': 'org-member',
        'meta': {
          'icon': 'ios-infinite',
          'title': '组织架构管理'
        },
        'component': 'org/org-member'
      }
    ]
  },
  {
    'path': '/member',
    'name': 'member',
    'meta': {
      'icon': 'logo-buffer',
      'showAlways': 'true',
      'title': '会员管理管理'
    },
    'component': 'Main',
    'children': [
      {
        'path': '/dept-member',
        'name': 'dept-member',
        'meta': {
          'icon': 'md-add',
          'title': '会员信息管理'
        },
        'component': 'member/dept-member'
      }
    ]
  },
  {
    'path': '/sys_user',
    'name': 'sys_user',
    'meta': {
      'icon': 'md-menu',
      'showAlways': 'true',
      'title': '系统管理'
    },
    'component': 'Main',
    'children': [
      {
        'path': '/sys-member',
        'name': 'sys-member',
        'meta': {
          'icon': 'md-notifications',
          'title': '用户管理'
        },
        'component': 'sys_user/add'
      },
      {
        'path': '/sys-role',
        'name': 'sys-role',
        'meta': {
          'icon': 'md-hammer',
          'title': '角色管理'
        },
        'component': 'sys_user/role'
      },
      {
        'path': '/sys-menu',
        'name': 'sys-menu',
        'meta': {
          'icon': 'logo-freebsd-devil',
          'title': '菜单管理'
        },
        'component': 'sys_user/menus'
      }
    ]
  },
  {
    'path': '/cms',
    'name': 'cms',
    'meta': {
      'icon': 'logo-buffer',
      'showAlways': 'true',
      'title': '资讯管理'
    },
    'component': 'Main',
    'children': [
      {
        'path': '/article-column',
        'name': 'article-column',
        'meta': {
          'icon': 'md-add',
          'title': '栏目管理'
        },
        'component': 'cms/article-column'
      },
      {
        'path': '/article-advice',
        'name': 'article-advice',
        'meta': {
          'icon': 'md-planet',
          'title': '资讯列表'
        },
        'component': 'cms/article-advice'
      }
    ]
  }
]
