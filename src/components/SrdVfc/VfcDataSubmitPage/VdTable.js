import React from 'react'
import {Table, Input, Button} from 'antd'

export default class VdTable extends React.Component {
  constructor(props) {
    super(props)
    this.cachedData = []
    this.data = []
    props.params.map((param, i) => {
      this.data.push({key: i + 1, paramName: param.PARAM_NAME})
      let dataList = []
      for (let i = 0; i < props.rowCount; i++) {
        dataList.push(0)
      }
      this.cachedData.push({vpID: param.ID, vpName: param.PARAM_NAME, dataListCount: props.rowCount, dataList: dataList})
    })
    this.columns = [{title: "核查项目", dataIndex: "paramName", key: "paramName", width: "5%"}]
    for (let i = 0; i < this.props.rowCount; i++) {
      this.columns.push({
        title: `第 ${i + 1} 次测量值`,
        dataIndex: `data_${i}`,
        key: `data_${i}`,
        width: `${95 / this.props.rowCount}%`,
        className: "vdtable-column-id",
        render: (text, record, index) => this.renderColumns(text, record, index, i),
      })
    }
  }

  saveCachedData() {
    this.props.vfcDataCachedSet(this.cachedData, this.props.index)
  }

  renderColumns(text, record, columnIndex, rowIndex) {
    return <Input onChange={e => this.cachedData[columnIndex].dataList[rowIndex] = e.target.value}/>
  }

  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.data} pagination={false} bordered={false}/>
        {/*<Button onClick={() => this.saveCachedData()}>save</Button>*/}
      </div>
    )
  }
}