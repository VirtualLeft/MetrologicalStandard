import * as c from '../../constants'

const initialState = {
  types: [],
  params: [],
  units: [],
  isPending: true,
  isRejected: false,
  isFulfilled: false,
  error: undefined
}

const promiseState = (type) => {
  const initState = {isPending: false, isRejected: false, isFulfilled: false}
  if (type.includes("_PENDING")) return {...initState, isPending: true}
  else if (type.includes("_REJECTED")) return {...initState, isRejected: true}
  else if (type.includes("_FULFILLED")) return {...initState, isFulfilled: true}
  else return initState
}

const params = (state = initialState, action) => {
  switch (action.type) {
    case `${c.VERTYPE_GET}_PENDING`:
    case `${c.VERPARAM_GET}_PENDING`:
    case `${c.VERUNIT_GET}_PENDING`:
    case `${c.VERPARAM_UPDATE}_PENDING`:
    case `${c.VERPARAM_ADD}_PENDING`:
    case `${c.VERPARAM_DEL}_PENDING`:
    return {...state, ...promiseState(action.type)}
    case `${c.VERTYPE_GET}_REJECTED`:
    case `${c.VERPARAM_GET}_REJECTED`:
    case `${c.VERUNIT_GET}_REJECTED`:
    case `${c.VERPARAM_UPDATE}_REJECTED`:
    case `${c.VERPARAM_ADD}_REJECTED`:
    case `${c.VERPARAM_DEL}_REJECTED`:
      return {...state, error: action.payload, ...promiseState(action.type)}
    case `${c.VERTYPE_GET}_FULFILLED`:
      return {...state, types: action.payload, ...promiseState(action.type)}
    case `${c.VERPARAM_GET}_FULFILLED`:
    case `${c.VERPARAM_UPDATE}_FULFILLED`:
    case `${c.VERPARAM_ADD}_FULFILLED`:
    case `${c.VERPARAM_DEL}_FULFILLED`:
      return {...state, params: action.payload, ...promiseState(action.type)}
    case `${c.VERUNIT_GET}_FULFILLED`:
      return {...state, units: action.payload, ...promiseState(action.type)}
    default:
      return initialState
  }
}

export default params