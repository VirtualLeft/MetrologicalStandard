import React from 'react'
import { Modal, Form, Input, Radio } from 'antd'

const FormItem = Form.Item

class UsAddUserDialog extends React.Component {
  checkPassword(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('PASSWORD')) {
      callback('密码不匹配！')
    } else {
      callback()
    }
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
  }
    return (
      <Modal
        visible={visible}
        title="创建新用户"
        okText="提交"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="用户名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('USER_NAME', {
              rules: [{ required: true, message: '用户名不能为空！' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('PASSWORD', {
              rules: [{ required: true, message: '密码不能为空！' }],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem label="确认密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('CONFIRM', {
              rules: [{
              required: true, message: '请确认密码！',
            }, {
              validator: this.checkPassword.bind(this),
            }],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem label="角色" {...formItemLayout}>
            {getFieldDecorator('PRIVILEGE_LEVEL', {
              initialValue: '1',
              rules: [{ required: true, message: '请选择角色！' }],
            })(
              <Radio.Group>
                <Radio value="1">普通用户</Radio>
                <Radio value="7">管理员</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}


export default Form.create()(UsAddUserDialog)