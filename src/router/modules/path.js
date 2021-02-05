
/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './components'
import chartsRouter from './charts'
import tableRouter from './table'
import nestedRouter from './nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: '文档', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: '操作导航', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   // hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: '便利贴', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/contractmanagement',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'contractmanagement',
    redirect: '/contractmanagement/index',
    meta: {
      title: '合同管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/contractManagement/index'),
        name: 'contractmanagementList',
        meta: {
          title: '合同列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/trainingDocumentManagement',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'trainingDocumentManagement',
    redirect: '/trainingDocumentManagement/index',
    meta: {
      title: '培训文件',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/trainingDocumentManagement/index'),
        name: 'trainingDocumentManagementList',
        meta: {
          title: '文件列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/UserInfoManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/userInfoManagement/index'),
        name: 'UserInfoManagement',
        meta: { title: '个人中心', icon: 'tab' }
      }
    ]
  },
  {
    path: '/regionalOrder',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/regionalOrder/index'),
        name: 'regionalOrder',
        meta: { title: '大区订单', icon: 'tab' }
      }
    ]
  },
  {
    path: '/carePackOrder',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'carePackOrder',
    redirect: '/carePackOrder/index',
    meta: {
      title: '志愿者B',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/volunteerB/carePackOrder/index'),
        name: 'carePackOrder',
        meta: {
          title: '关怀包订单',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'regionalOrder',
        component: () => import('@/views/volunteerB/regionalOrder/index'),
        name: 'regionalOrder',
        meta: { title: '分发管理' }
      },
      {
        path: 'saleAndInventory',
        component: () => import('@/views/volunteerB/saleAndInventory/index'),
        name: 'saleAndInventory',
        meta: {
          title: '进销存管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'meberMang',
        component: () => import('@/views/volunteerB/meberMang/index'),
        name: 'meberMang',
        meta: {
          title: '患者管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/carePackOrderA',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'carePackOrderA',
    redirect: '/carePackOrderA/index',
    meta: {
      title: '志愿者A',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/volunteerB/carePackOrder/index'),
        name: 'carePackOrder',
        meta: {
          title: '大区订单管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'regionalOrder',
        component: () => import('@/views/volunteerB/regionalOrder/index'),
        name: 'regionalOrder',
        meta: { title: '分发订单' }
      },
      {
        path: 'saleAndInventory',
        component: () => import('@/views/volunteerB/saleAndInventory/index'),
        name: 'saleAndInventory',
        meta: {
          title: '商品明细',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'meberMang',
        component: () => import('@/views/volunteerB/meberMang/index'),
        name: 'meberMang',
        meta: {
          title: '患者管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/shopManagement',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'shopManagement',
    redirect: '/shopManagement/index',
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/shopManagement/index'),
        name: 'shopManagement',
        meta: {
          title: '商品列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'CarePack',
        component: () => import('@/views/shopManagement/carePack'),
        name: 'CarePack',
        meta: {
          title: '关怀包列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  {
    path: '/distributionAddressManagement',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'distributionAddressManagement',
    redirect: '/distributionAddressManagement/index',
    meta: {
      title: '分发地址管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/distributionAddressManagement/index'),
        name: 'distributionAddressManagement',
        meta: {
          title: '分发地址列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },



  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: '图标库',
        meta: { title: '图标库', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/hospitalUser',
    component: Layout,
    redirect: '/example/list',
    name: 'hospitalUser',
    meta: {
      title: '医院管理',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'hospitalList',
        meta: { title: '医院列表', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },
  //
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: '主题', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: '复制文本', icon: 'clipboard' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
