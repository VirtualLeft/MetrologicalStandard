import React from 'react'
import { connect } from 'react-redux'
import { UsComponent } from '../components/SysSet'
import { getUser, clearUser, addUser, updateUser, delUser, editRequest, actionByType, } from '../actions/sysset/usersettings'

import * as c from '../constants'

const mapDispatchToProps = (dispatch) => ({
  addRequest: () => dispatch(actionByType(c.ADD_REQUEST)()),
  addModify: () => dispatch(actionByType(c.ADD_MODIFY)()),
  addQuit: () => dispatch(actionByType(c.ADD_QUIT)()),
  editModify: () => dispatch(actionByType(c.EDIT_MODIFY)()),
  editQuit:() => dispatch(actionByType(c.EDIT_QUIT)()),
  userGet:() => dispatch(getUser()),
  clearUser: () => dispatch(clearUser()),
  userAdd:(user) => dispatch(addUser(user)),
  userUpdate:(user) => dispatch(updateUser(user)),
  delUser: (user) => dispatch(delUser(user)),
  editRequest: (index) => dispatch(editRequest(index)),
})

const mapStateToProps = (state) => ({
  users: state.sysset.usersettings.users,
  editLine: state.sysset.usersettings.editLine,
  isEditModified: state.sysset.usersettings.editModified,
  addFormStatus: state.sysset.usersettings.addFormStatus,
})

const UserSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsComponent)


export default UserSettings

