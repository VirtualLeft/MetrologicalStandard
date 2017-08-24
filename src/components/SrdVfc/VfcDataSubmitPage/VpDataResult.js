import React from 'react'
import {Button, Table} from 'antd'
import VpParam from '../../../mscommon/VpParam'
import VdDataResultDraft from './VdDataResultDraft'

export default class VpDataResult extends React.Component {

  componentDidMount() {
    // VpParam.runAvgCal(this.props.dataSource).then(console.log("done"))
  }

  changeRowSpan(expanded, rowSpan) {
    return expanded ? rowSpan + 1 : rowSpan - 1
  }

  tableExpandRow(expanded, record, data) {
    let recordFirstRow = data[record.VP_NAME_FIRST_ROW]
    recordFirstRow.VP_NAME_ROWSPAN = this.changeRowSpan(expanded, recordFirstRow.VP_NAME_ROWSPAN)
    if (record.hasOwnProperty("VP_NAME1_FIRST_ROW")) {
      let recordFirstRow_1 = data[record.VP_NAME1_FIRST_ROW]
      recordFirstRow_1.VP_NAME1_ROWSPAN = this.changeRowSpan(expanded, recordFirstRow_1.VP_NAME1_ROWSPAN)
    }
    if (record.hasOwnProperty("VP_NAME2_FIRST_ROW")) {
      let recordFirstRow_2 = data[record.VP_NAME2_FIRST_ROW]
      recordFirstRow_2.VP_NAME2_ROWSPAN = this.changeRowSpan(expanded, recordFirstRow_2.VP_NAME2_ROWSPAN)
    }
  }

  initTableData(data) {
    let data_key = 0
    const {types, params, columnCount} = this.props
    types.map((type, i) => {
      switch (type.VP_DEEP) {
        case 1:
          let params_1_1 = VpParam.getParamsByBelong(params, type.ID)
          let firstRowKey_1_1 = 0
          params_1_1.map((param_1_1, j) => {
            if (j === 0) firstRowKey_1_1 = data_key
            let cell = {
              key: data_key,
              ID: `${param_1_1.ID}`,
              VP_NAME: type.VP_NAME,
              PARAM_NAME: param_1_1.PARAM_NAME,
              VP_NAME_SPAN_LEVEL: 1,
              VP_NAME_ROWSPAN: params_1_1.length,
              VP_NAME_FIRST_ROW: firstRowKey_1_1,
            }
            data.push(cell)
            VpParam.insertData2Cell(this.props.dataSource, cell)
            data_key = data_key + 1
          })
          break
        case 2:
          let params_2_1 = VpParam.getParamsByBelong(params, type.ID)
          let firstRowKey_2_1 = 0
          params_2_1.map((param_2_1, j) => {
            if (j === 0) firstRowKey_2_1 = data_key
            let params_2_2 = VpParam.getParamsByParent(params, param_2_1.ID)
            let firstRowKey_2_2 = 0
            params_2_2.map((param_2_2, k) => {
              if (k === 0) firstRowKey_2_2 = data_key
              let cell = {
                key: data_key,
                ID: `${param_2_2.ID}`,
                VP_NAME: type.VP_NAME,
                VP_NAME_1: param_2_1.PARAM_NAME,
                PARAM_NAME: param_2_2.PARAM_NAME,
                VP_NAME_SPAN_LEVEL: 2,
                VP_NAME_FIRST_ROW: firstRowKey_2_1,
                VP_NAME1_FIRST_ROW: firstRowKey_2_2,
              }
              if (k === 0) {
                cell["VP_NAME1_ROWSPAN"] = params_2_2.length
                if (j === 0) {
                  cell["VP_NAME_ROWSPAN"] = VpParam.getSecondLevelCountByID(params, type.ID)
                }
              }
              VpParam.insertData2Cell(this.props.dataSource, cell)
              data.push(cell)
              data_key = data_key + 1
            })
          })
          break
        case 3:
          let params_3_1 = VpParam.getParamsByBelong(params, type.ID)
          let firstRowKey_3_1 = 0
          params_3_1.map((param_3_1, j) => {
            if (j === 0) firstRowKey_3_1 = data_key
            let params_3_2 = VpParam.getParamsByParent(params, param_3_1.ID)
            let firstRowKey_3_2 = 0
            params_3_2.map((param_3_2, k) => {
              if (k === 0) firstRowKey_3_2 = data_key
              let params_3_3 = VpParam.getParamsByParent(params, param_3_2.ID)
              let firstRowKey_3_3 = 0
              params_3_3.map((param_3_3, l) => {
                if (l === 0) firstRowKey_3_3 = data_key
                let cell = {
                  key: data_key,
                  ID: `${param_3_3.ID}`,
                  VP_NAME: type.VP_NAME,
                  VP_NAME_1: param_3_1.PARAM_NAME,
                  VP_NAME_2: param_3_2.PARAM_NAME,
                  PARAM_NAME: param_3_3.PARAM_NAME,
                  VP_NAME_SPAN_LEVEL: 3,
                  VP_NAME_FIRST_ROW: firstRowKey_3_1,
                  VP_NAME1_FIRST_ROW: firstRowKey_3_2,
                  VP_NAME2_FIRST_ROW: firstRowKey_3_3
                }
                if (l === 0) {
                  cell["VP_NAME2_ROWSPAN"] = params_3_3.length
                  if (k === 0) {
                    cell["VP_NAME1_ROWSPAN"] = VpParam.getSecondLevelCountByParentID(params, param_3_1.ID)
                    if (j === 0)
                      cell["VP_NAME_ROWSPAN"] = VpParam.getThirdLevelCountByID(params, type.ID)
                  }
                }
                VpParam.insertData2Cell(this.props.dataSource, cell)
                data.push(cell)
                data_key = data_key + 1
              })
            })
          })
          break
      }
    })
  }


  render() {
    const {types, params, columnCount} = this.props
    const columns = [
      {
        title: "核查项目",
        colSpan: 3,
        dataIndex: 'VP_NAME',
        width: "5%",
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          }
          obj.props.colSpan = row.VP_NAME_SPAN_LEVEL === 1 ? 3 : 1
          obj.props.rowSpan = row.VP_NAME_FIRST_ROW === row.key ? row.VP_NAME_ROWSPAN : 0
          return obj
        }
      }, {
        title: "子参数1",
        dataIndex: 'VP_NAME_1',
        width: "5%",
        colSpan: 0,
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          }
          obj.props.colSpan = row.VP_NAME_SPAN_LEVEL === 1 ? 0 : row.VP_NAME_SPAN_LEVEL === 2 ? 2 : 1
          obj.props.rowSpan = row.VP_NAME1_FIRST_ROW === row.key ? row.VP_NAME1_ROWSPAN : 0
          return obj
        }
      }, {
        title: "子参数2",
        dataIndex: 'VP_NAME_2',
        width: "5%",
        colSpan: 0,
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          }
          obj.props.colSpan = row.VP_NAME_SPAN_LEVEL === 3 ? 1 : 0
          obj.props.rowSpan = row.VP_NAME2_FIRST_ROW === row.key ? row.VP_NAME2_ROWSPAN : 0
          return obj
        }
      }, {
        title: "参数名称",
        dataIndex: 'PARAM_NAME',
        width: "5%"
      }
    ]

    for (let i = 1; i <= columnCount; i++) {
      columns.push({
        title: `数据${i}`,
        dataIndex: `data_${i}`
      })
    }
    columns.push({
      title: "平均值",
      dataIndex: "xavg"
    }, {
      title: "实验标准差",
      dataIndex: "sj"
    }, {
      title: "计算时间",
      dataIndex: "time"
    })

    const data = []
    this.initTableData(data)
    return (
      <div>
        <Table columns={columns}
               dataSource={data}
               bordered pagination={false}
               expandedRowRender={record => <VdDataResultDraft record={record} {...this.props} />}
               onExpand={(expanded, record) => this.tableExpandRow(expanded, record, data)}/>
        <Button onClick={() => this.props.backToSubmitPage()}>检查输入数据</Button>
        <Button onClick={() => this.props.backToSubmitPage()}>保存结果</Button>
        <Button onClick={() => this.props.backToSubmitPage()}>放弃测量</Button>
      </div>
    )
  }
}