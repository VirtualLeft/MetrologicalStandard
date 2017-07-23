import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import MsComponent from '../../mscommon'
import { Table, Modal, Input, Icon, Button, Form, Popconfirm, Select, Row, Col } from 'antd'

const confirm = Modal.confirm
const FormItem = Form.Item
const Option = Select.Option

export default class UsTable extends MsComponent {
  constructor(props) {
    super(props);
    const { editLine, isAdmin } = this.props
    this.pageCurrent = 1
    this.pageSize = 0
    this.columns = (editLine) => {
      var cols =
        [{
          title: '用户名',
          dataIndex: 'USER_NAME',
          width: '20%',
          render: (text, record, index) => this.renderColumns(text, record, editLine, 'update_USER_NAME', 'INPUT')
        },{
          title: '权限',
          dataIndex: 'PRIVILEGE_LEVEL',
          width: '10%',
          render: (text, record, index) => this.renderColumns(text, record, editLine, 'update_PRIVILEGE_LEVEL', 'SELECT')
        },{
          title: '注册时间',
          dataIndex: 'TIME_REGISTER',
          width: '30%',
        },{
          title: '最后登录',
          dataIndex: 'TIME_LASTLOGIN',
        },]
      if(isAdmin) {
        cols.push({
          title: '操作',
          dataIndex: 'OPERATE',
          width: 130,
          render: (text, record, index) => this.renderOperatorRow(record, editLine)
        })
      }
      return cols
    }
  }

  render() {
    const { dataSource, bordered, rowKey, editLine } = this.props
    return (
      <div>
        <Table  dataSource={dataSource} bordered={bordered} rowKey={record => record.ID} title={() => this.tableHeader()} 
                columns={this.columns(editLine)} onChange={(pagination, filters, sorter) => this.onTableChange(pagination, filters, sorter)}
                rowSelection={this.rowSelection} />
      </div>
    )
  }

  privilegeTrans(text) {
    if(text.toString() == 7)
      return "管理员"
    else if(text.toString() == 1)
      return "普通用户"
    else
      return " "
  }

  renderColumns(text, record, editLine, keyword, mode) {
    if (typeof editLine === 'undefined') {
      return text
    }
    return (
      <div>
        {
          editLine == record.ID ? 
            mode == 'INPUT' ?
            <div>
              <Input
                defaultValue={text.toString()}
                onChange={e => {record[keyword] = e.target.value; this.props.editModify()}}
              />
            </div>
            :
            <div>
              <Select
                defaultValue={text.toString()}
                onChange={value => {record[keyword] = value; this.props.editModify()}}
              >
              <Option value="1">普通用户</Option>
              <Option value="7">管理员</Option>
              </Select>
            </div>
          :
            mode == 'INPUT' ?
            <div className="usertable-row-text">
              {text.toString() || ' '}
            </div>
            :
            <div className="usertable-row-text">
              {this.privilegeTrans(text)}
            </div>
        }
      </div>
    )
  }

  renderOperatorRow(record, editLine) {
    const { dataSource, editRequest, editQuit } = this.props
    return(
      <div>
        { 
          editLine != record.ID ?
          <Form layout="inline" className="usertable-operate-item">
            <FormItem><Button type="default" icon="edit" onClick={() => editRequest(record.ID)} disabled={editLine != -1} /></FormItem>
            <FormItem><Button type="default" icon="delete" onClick={() => this.showConfirm(record)} disabled={editLine != -1} /></FormItem>
          </Form>
          :
          <Form layout="inline" className="usertable-operate-item">
            <FormItem><Button type="default" icon="save" onClick={() => {
              var user = Object.assign(record)
              user.USER_NAME = record.update_USER_NAME || record.USER_NAME
              user.PRIVILEGE_LEVEL = record.update_PRIVILEGE_LEVEL || record.PRIVILEGE_LEVEL
              this.onEditSaved(user)}
            } /></FormItem>
            <FormItem>
              {
                this.props.isEditModified ? 
                <Popconfirm title="取消修改?" onConfirm={() => editQuit()}>
                  <Button type="default" icon="close"/>
                </Popconfirm>
                :
                <Button type="default" icon="close" onClick={() => editQuit()}/>
              }
            </FormItem>
          </Form>
        }
      </div>
    )
  } 

  tableHeader(currentPageData) {
    const { addRequest } = this.props
    return (
      <Row>
        <Col span={2} ><h2><div className="usertable-header-title">用户管理</div></h2></Col>
        <Col span={3} offset={19} >
          <div className="usertable-header-buttons"><Button type="primary" onClick={() => addRequest()}>添加用户</Button></div>
          <div className="usertable-header-buttons"><Button type="default" onClick={() => addRequest()}>删除所选</Button></div>
        </Col>
      </Row>
          
    )
  }

  onTableChange(pagination, filters, sorter) {
    this.pageCurrent = pagination.current
    this.pageSize = pagination.pageSize
  }

  onEditDeleted(user) {
    this.props.delUser(user)
              .then(({ value, action }) => { this.operateSuccess() })
              .catch((error) => { this.operateFail(error) })
  }

  onEditSaved(user) {
    this.props.editQuit()
    this.props.updateUser(user)
              .then(({ value, action }) => { this.operateSuccess() })
              .catch((error) => { this.operateFail(error) })
  }

  showConfirm(record) {
    const onEditDeleted = this.onEditDeleted
    confirm({
      title: '确认删除用户吗？',
      content: '删除后用户信息不可恢复',
      onOk: () => this.onEditDeleted(record)
    })
  }

  rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
  }
}

UsTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isEditModified: PropTypes.bool.isRequired,
  editRequest: PropTypes.func.isRequired,
  editQuit: PropTypes.func.isRequired,
};