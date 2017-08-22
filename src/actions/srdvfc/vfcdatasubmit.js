import * as c from '../../constants'
let db = require('electron').remote.require('./db')

export function vfcCachedDataGet () {
  return {
    type: c.VFCCACHED_DATA_GET,
  }
}

export function vfcCachedDataSet (cachedData, id) {
  return {
    type: c.VFCCACHED_DATA_SET,
    id: id,
    cachedData: cachedData
  }
}

export function vfcCachedDataClear () {
  return {
    type: c.VFCCACHED_DATA_CLEAR,
  }
}