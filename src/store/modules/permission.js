import { asyncRoutes, constantRoutes } from '@/router/modules/path'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // console.log(roles, route, '对比数据')
  if (route.meta && route.meta.roles) {
    console.log(roles.some(role => route.meta.roles.includes(role)))
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = []
      roles.forEach(item => {
        if (0 === item.childMenu.length) {
          // try {
          var s = asyncRoutes.filter(it => (it.name === item.code))
          if (s.length > 0) {
            accessedRoutes.push(s[0])
          }
          // } catch (e) {}
        } else {
          // 过滤子集本地路由
          var childrenRouters = asyncRoutes.filter(o => o.name === item.code)[0];
          if (!childrenRouters) { return }
          // 取code name
          childrenRouters.children = childrenRouters.children.filter(i => (-1 !== item.childMenu.map(i => i.code).indexOf(i.name)));
          accessedRoutes.push(childrenRouters);
        }
      });
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
