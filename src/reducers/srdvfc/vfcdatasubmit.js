import * as c from '../../constants'

const initialState = {
  cachedDataGroup: [
    [], [], [], [], [], [], []
  ]
}

const cachedData = (state = initialState, action) => {
  switch(action.type)
  {
    case c.VFCDATA_CACHED_SET:
      let cachedDataGroup = state.cachedDataGroup
      cachedDataGroup[action.id] = action.cachedData
      return {...state, cachedDataGroup:cachedDataGroup}
    default:
      return {...state}
  }
}
export default cachedData