import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/product',
    name: '商品管理',
    meta: {
      title: '商品管理',
      icon: 'ios-book'
    },
    component: Main,
    children: [
      {
        path: 'product-add-page',
        name: 'product-add-page',
        meta: {
          icon: 'md-add',
          title: '新增商品',
          hideInMenu: true
        },
        component: () => import('@/view/product/product-edit-page.vue')
      },
      {
        path: 'product-update-page',
        name: 'product-update-page',
        meta: {
          icon: 'md-update',
          title: '更新商品',
          hideInMenu: true
        },
        component: () => import('@/view/product/product-edit-page.vue')
      },
      {
        path: 'product-list-page',
        name: 'product-list-page',
        meta: {
          icon: 'md-download',
          title: '商品列表'
        },
        component: () => import('@/view/product/product-list-page.vue')
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      title: '分类管理',
      icon: 'ios-book'
    },
    component: Main,
    children: [
      {
        path: 'category-add-page',
        name: 'category-add-page',
        meta: {
          icon: 'md-add',
          title: '新增分类',
          hideInMenu: true
        },
        component: () => import('@/view/category/category-edit-page.vue')
      },
      {
        path: 'category-update-page',
        name: 'category-update-page',
        meta: {
          icon: 'md-update',
          title: '更新分类',
          hideInMenu: true
        },
        component: () => import('@/view/category/category-edit-page.vue')
      },
      {
        path: 'category-list-page',
        name: 'category-list-page',
        meta: {
          icon: 'md-download',
          title: '分类列表'
        },
        component: () => import('@/view/category/category-list-page.vue')
      }
    ]
  },
  {
    path: '/coupon',
    name: 'coupon',
    meta: {
      title: '优惠券管理',
      icon: 'ios-book'
    },
    component: Main,
    children: [
      {
        path: 'coupon-add-page',
        name: 'coupon-add-page',
        meta: {
          icon: 'md-add',
          title: '新增优惠券',
          hideInMenu: true
        },
        component: () => import('@/view/coupon/coupon-edit-page.vue')
      },
      {
        path: 'coupon-update-page',
        name: 'coupon-update-page',
        meta: {
          icon: 'md-update',
          title: '更新优惠券',
          hideInMenu: true
        },
        component: () => import('@/view/coupon/coupon-edit-page.vue')
      },
      {
        path: 'coupon-list-page',
        name: 'coupon-list-page',
        meta: {
          icon: 'md-download',
          title: '优惠券列表'
        },
        component: () => import('@/view/coupon/coupon-list-page.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'ios-book'
    },
    component: Main,
    children: [
      {
        path: 'order-list-page',
        name: 'order-list-page',
        meta: {
          icon: 'md-download',
          title: '订单列表'
        },
        component: () => import('@/view/order/order-list-page.vue')
      },
      {
        path: 'refund-order-list-page',
        name: 'refund-order-list-page',
        meta: {
          icon: 'md-download',
          title: '退款订单列表'
        },
        component: () => import('@/view/order/refund-order-list-page.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'ios-book'
    },
    component: Main,
    children: [
      {
        path: 'admin',
        name: 'admin',
        meta: {
          icon: 'md-download',
          title: '管理员管理'
        },
        children: [
          {
            path: 'admin-add-page',
            name: 'admin-add-page',
            meta: {
              icon: 'md-download',
              title: '新增管理员'
            },
            component: () => import('@/view/system/system-admin-add-page.vue')
          },
          {
            path: 'admin-list-page',
            name: 'admin-list-page',
            meta: {
              icon: 'md-download',
              title: '管理员列表'
            },
            component: () => import('@/view/system/system-admin-list-page.vue')
          }
        ]
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          icon: 'md-download',
          title: '角色管理'
        }
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
