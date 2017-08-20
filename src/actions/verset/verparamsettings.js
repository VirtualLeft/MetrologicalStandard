import * as c from '../../constants'
let db = require('electron').remote.require('./db')

export function verParamGet () {
  return {
    type: c.VERPARAM_GET,
    payload: db.verParamGet()
  }
}

export function verTypesGet () {
  return {
    type: c.VERTYPE_GET,
    payload: db.verTypesGet()
  }
}

export function verUnitsGet () {
  return {
    type: c.VERUNIT_GET,
    payload: db.verUnitsGet()
  }
}

export function verParamUpdate(param) {
  return {
    type: c.VERPARAM_UPDATE,
    payload: db.verParamUpdate(param)
  }
}

export function verParamAdd(param) {
  return {
    type: c.VERPARAM_ADD,
    payload: db.verParamAdd(param)
  }
}

export function verParamDelete(param) {
  return {
    type: c.VERPARAM_DEL,
    payload: db.verParamDelete(param)
  }
}