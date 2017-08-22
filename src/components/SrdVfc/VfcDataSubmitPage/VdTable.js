import React from 'react'
import {Table, Input} from 'antd'
import _ from 'lodash'
export default class VdTable extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{title: "核查项目", dataIndex: "PARAM_NAME", key: "PARAM_NAME", width: "5%"}]
    for (let i = 0; i < this.props.columnCount; i++) {
      this.columns.push({
        title: `第 ${i + 1} 次测量值`,
        dataIndex: `data_${i + 1}`,
        key: `data_${i + 1}`,
        width: `${95 / this.props.columnCount}%`,
        className: "vdtable-column-id",
        render: (text, record, index) => this.renderColumns(text, record, index, i),
      })
    }
  }

  renderColumns(text, record, columnIndex, rowIndex) {
    return (
    <div>
      <Input defaultValue={parseInt(text) !== 0 ? text : ""}
             key={record.ID}
             onChange={e => this.props.setCachedData(record.ID, rowIndex, e.target.value)}/>
    </div>
    )
  }

  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.props.dataSource} pagination={false} bordered={false}/>
      </div>
    )
  }
}