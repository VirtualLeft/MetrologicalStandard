import * as c from '../../constants'
let db = require('electron').remote.require('./db')

export function vfcDataCachedGet () {
  return {
    type: c.VFCDATA_CACHED_GET,
  }
}

export function vfcDataCachedSet (cachedData, id) {
  return {
    type: c.VFCDATA_CACHED_SET,
    id: id,
    cachedData: cachedData
  }
}