import { combineReducers } from 'redux'
import * as c from '../../constants'

const initialState = {
    userList: [],
}

const users = (state = initialState, action) => {
  switch(action.type) {
      case `${c.GET_USER}_PENDING`:
      case `${c.ADD_USER}_PENDING`:
      case `${c.UPDATE_USER}_PENDING`:
      case `${c.DEL_USER}_PENDING`:
        return {...state, 
          isPending: true,
          isRejected: false,
          isFulfilled: false,
        }

      case `${c.GET_USER}_REJECTED`:
      case `${c.ADD_USER}_REJECTED`:
      case `${c.UPDATE_USER}_REJECTED`:
      case `${c.DEL_USER}_REJECTED`:
        return {...state, 
          isPending: false,
          isRejected: true,
          isFulfilled: false,
          error: action.payload
        }

      case `${c.GET_USER}_FULFILLED`:
      case `${c.ADD_USER}_FULFILLED`:
      case `${c.UPDATE_USER}_FULFILLED`:
      case `${c.DEL_USER}_FULFILLED`:
        return {...state, 
          isPending: false,
          isRejected: false,
          isFulfilled: true,
          userList: action.payload
        }

      case c.CLEAR_USER:
        return {...state, userList: []}
      default: 
        return {...state}
  }
}

const editLine = (state = -1, action) => {
  switch(action.type) {
    case c.EDIT_REQUEST:
      return action.index
    case c.EDIT_QUIT:
      return -1
    default: 
      return state
  }
}

const editModified = (state = false, action) => {
  switch(action.type) {
    case c.EDIT_MODIFY:
      return true
    case c.EDIT_QUIT:
      return false
    default: 
      return state
  }
}

const addForm_InitialState = {visiable: false, modified: false}

const addFormStatus = (state = addForm_InitialState, action) => {
  switch(action.type) {
    case c.ADD_REQUEST:
      return {...state, visiable: true}
    case c.ADD_MODIFY:
      return {...state, modified: true}
    case c.ADD_QUIT:
      return {...state, visiable: false, modified: false}
    default: 
      return {...state}
  }
}

export default combineReducers({ addFormStatus, users, editLine, editModified })