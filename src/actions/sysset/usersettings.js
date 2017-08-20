import * as c from '../../constants'
var db = require('electron').remote.require('./db')

export function getUser() {
  return {
    type: c.GET_USER,
    payload: db.userGet()
  }
}

export function clearUser() {
  return {
    type: c.CLEAR_USER
  }
}

export function addUser(user) {
  return {
    type: c.ADD_USER,
    payload: db.userAdd(user)
  }
}

export function updateUser(user) {
  return {
    type: c.UPDATE_USER,
    payload: db.userUpdate(user)
  }
}

export function delUser(user) {
  return {
    type: c.DEL_USER,
    payload: db.userDelete(user)
  }
}

export function editRequest(index) {
  return {
    type: c.EDIT_REQUEST,
    index: index
  }
}

export function actionByType(type) {
  return () => ({
    type: type,
  })
}