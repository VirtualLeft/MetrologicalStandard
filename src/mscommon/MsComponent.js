import React, { Component } from 'react'
import { message } from 'antd'

export default class MsComponent extends Component {
  constructor(props) {
    super(props)
  }

  operateSuccess() {
    message.success('操作成功！')
  }

  operateFail(e) {
    message.error('操作失败！原因：' + e)
  }
}
