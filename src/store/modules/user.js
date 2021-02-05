import { login } from '@/api/user'
import {getToken, setToken, removeToken, setUserInfo, getUserInfo} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ principal: username.trim(), credentials: password }).then(({data}) => {
        const { token, code, name} = data;
        commit('SET_TOKEN', token);
        commit('SET_ROLES', [code]);
        commit('SET_NAME', name);
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_INTRODUCTION', name);
        commit('SET_USERINFO', data)
        setToken(token);
        setUserInfo(data);
        resolve({data})
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    var userInfo = getUserInfo();
    return new Promise((resolve, reject) => {
      const {code, name} = userInfo;
      commit('SET_ROLES', [code]);
      commit('SET_NAME', name);
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit('SET_INTRODUCTION', name);
      resolve(userInfo)
    })
    // getInfo(state.token).then(response => {
    //   const { data } = response

    // if (!data) {
    //   reject('Verification failed, please Login again.')
    // }

    // const { roles, name, avatar, introduction } = {
    //   roles: ['admin'],
    //   introduction: 'I am a super administrator',
    //   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    //   name: 'Super Admin'
    // }
    //
    // // roles must be a non-empty array
    // if (!roles || roles.length <= 0) {
    //   reject('getInfo: roles must be a non-null array!')
    // }
    //
    // commit('SET_ROLES', roles)
    // commit('SET_NAME', name)
    // commit('SET_AVATAR', avatar)
    // commit('SET_INTRODUCTION', introduction)
    // resolve({
    //   roles: ['admin'],
    //   introduction: 'I am a super administrator',
    //   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    //   name: 'Super Admin'
    // })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
