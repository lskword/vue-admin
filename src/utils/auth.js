import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';

const UserInfo = 'userInfo';
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getUserInfo() {
  return (JSON.parse(decodeURIComponent(sessionStorage.getItem(UserInfo))))
}

export function setUserInfo(data) {
  return sessionStorage.setItem(UserInfo, encodeURI(JSON.stringify(data)))
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfo)
}
