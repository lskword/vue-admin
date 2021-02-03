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


export async function getUserInfo() {
  return await (JSON.parse(decodeURIComponent(sessionStorage.getItem(UserInfo))))
}

export async function setUserInfo(data) {
  return await sessionStorage.setItem(UserInfo, encodeURI(JSON.stringify(data)))
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfo)
}
