import React from 'react'
import MsComponent from '../../mscommon'
import {Spin} from 'antd';
import UsTable from './UsTable'
import UsAddUserDialog from './UsAddUserDialog'

import '../../../public/css/usersetting.css'

export default class UsComponent extends MsComponent {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentWillMount() {
    this.props.clearUser()
  }

  componentDidMount() {
    this.props.userGet().then(() => {
      this.setState({...this.state, loading: false})
    })
  }

  render() {
    const {dispatch, users, editLine, isEditModified, isAdmin, addFormStatus} = this.props
    return (
      <div className="tablewrapper">
        <Spin size="large" spinning={this.state.loading}>
          <UsAddUserDialog
            ref={(form) => {
              this.form = form
            }}
            visible={addFormStatus.visiable}
            onCancel={() => this.onAddQuited()}
            onCreate={() => this.onAddSaved()}
            onChange={() => this.onAddModified()}
            {...this.props}
          />
          <UsTable className='usertable' dataSource={users.userList} bordered editLine={editLine} isAdmin={true}
                   isEditModified={isEditModified || false}
                   {...this.props}
          />
        </Spin>
      </div>
    )
  }

  onAddRequested() {
    this.props.addRequest()
  }

  onAddModified() {
    this.props.addModify()
  }

  onAddSaved() {
    const form = this.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.props.userAdd(values)
        .then(({value, action}) => {
          this.operateSuccess();
          form.resetFields();
          this.props.addQuit()
        })
        .catch((error) => {
          this.operateFail(error)
        })
    })
  }

  onAddQuited() {
    this.props.addQuit()
  }

}