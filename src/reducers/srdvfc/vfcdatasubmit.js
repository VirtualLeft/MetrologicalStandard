import * as c from '../../constants'

const initialState = {
  cachedDataGroup: [
    [], [], [], [], [], [], []
  ]
}

const cachedData = (state = initialState, action) => {
  switch(action.type)
  {
    case c.VFCCACHED_DATA_SET:
      let cachedDataGroup = state.cachedDataGroup
      cachedDataGroup[action.id] = action.cachedData
      return {...state, cachedDataGroup:cachedDataGroup}
    case c.VFCCACHED_DATA_CLEAR:
      return {...state, cachedDataGroup: [
        [], [], [], [], [], [], []
      ]}
    default:
      return {...state}
  }
}
export default cachedData