import React from 'react'
import { Input, Select, Form } from 'antd'

const FormItem = Form.Item

export default class ValueBox extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('paramValue') && getFieldError('paramValue');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('paramValue', {
            rules: [{ required: true, message: '参数值不能为空！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="参数值" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Select className="vplist_item_nameselect"
                    defaultValue={this.props.paramUnit}
                    onChange={value => this.props.unitChange(value)}>
              {
                this.props.units.map((unit, i) => (
                  <Option value={unit.PARAM_UNIT} key={i}>{unit.PARAM_UNIT}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}