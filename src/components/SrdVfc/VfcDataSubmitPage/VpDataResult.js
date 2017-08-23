import React from 'react'
import {Button, Table} from 'antd'
import VpParam from '../../../mscommon/VpParam'

export default class VpDataResult extends React.Component {

  componentDidMount() {
    VpParam.runAvgCal(this.props.dataSource).then(console.log("done"))
  }

  render() {
    const {types, params} = this.props
    const columns = [
      {
        title: "核查项目",
        colSpan: 3,
        dataIndex: 'VP_NAME',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          }
          obj.props.colSpan = row.VP_NAME_SPAN_LEVEL === 1 ? 3 : 1
          obj.props.rowSpan = row.VP_NAME_FIRST_ROW ? row.VP_NAME_ROWSPAN : 0
          console.log(row.VP_NAME_FIRST_ROW)
          return obj
        }
      }, {
        title: "子参数1",
        dataIndex: 'VP_NAME_1',
        colSpan: 0,
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          }
          obj.props.colSpan = row.VP_NAME_SPAN_LEVEL === 1 ? 0 : row.VP_NAME_SPAN_LEVEL === 2 ? 2 : 1
          // obj.props.rowSpan = row.VP_NAME1_FIRST_ROW ? row.VP_NAME1_ROWSPAN : 0
          return obj
        }
      }, {
        title: "子参数2",
        dataIndex: 'VP_NAME_2',
        colSpan: 0,
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          }
          obj.props.colSpan = row.VP_NAME_SPAN_LEVEL === 3 ? 1 : 0
          return obj
        }
      }, {
        title: "参数名称",
        dataIndex: 'PARAM_NAME'
      }
    ]

    const data = []
    let data_key = 0
    types.map((type, i) => {
      switch (type.VP_DEEP) {
        case 1:
          let params_1_1 = VpParam.getParamsByBelong(params, type.ID)
          params_1_1.map((param_1_1, j) => {
            data.push({
                key: data_key,
                ID: `${param_1_1.ID}`,
                VP_NAME: type.VP_NAME,
                PARAM_NAME: param_1_1.PARAM_NAME,
                VP_NAME_SPAN_LEVEL: 1,
                VP_NAME_ROWSPAN: params_1_1.length,
                VP_NAME_FIRST_ROW: j === 0
              }
            )
            data_key = data_key + 1
          })
          return
        case 2:
          let params_2_1 = VpParam.getParamsByBelong(params, type.ID)
          params_2_1.map((param_2_1, j) => {
            let params_2_2 = VpParam.getParamsByParent(params, param_2_1.ID)
            params_2_2.map((param_2_2, k) => {
              data.push({
                key: data_key,
                ID: `${param_2_2.ID}`,
                VP_NAME: type.VP_NAME,
                VP_NAME_1: param_2_1.PARAM_NAME,
                PARAM_NAME: param_2_2.PARAM_NAME,
                VP_NAME_SPAN_LEVEL: 2,
                VP_NAME_ROWSPAN: VpParam.getSecondLevelCountByID(params, type.ID),
                VP_NAME_FIRST_ROW: j === 0 && k === 0,
                VP_NAME1_ROWSPAN: params_2_1.length,
                VP_NAME1_FIRST_ROW: k === 0,
              })
              data_key = data_key + 1
            })
          })
          return
        case 3:
          let params_3_1 = VpParam.getParamsByBelong(params, type.ID)
          params_3_1.map((param_3_1, j) => {
            let params_3_2 = VpParam.getParamsByParent(params, param_3_1.ID)
            params_3_2.map((param_3_2, k) => {
              let params_3_3 = VpParam.getParamsByParent(params, param_3_2.ID)
              params_3_3.map((param_3_3, l) => {
                data.push({
                  key: data_key,
                  ID: `${param_3_3.ID}`,
                  VP_NAME: type.VP_NAME,
                  VP_NAME_1: param_3_1.PARAM_NAME,
                  VP_NAME_2: param_3_2.PARAM_NAME,
                  PARAM_NAME: param_3_3.PARAM_NAME,
                  VP_NAME_SPAN_LEVEL: 3,
                  VP_NAME_ROWSPAN: VpParam.getThirdLevelCountByID(params, type.ID),
                  VP_NAME_FIRST_ROW: j === 0 && k ===0 && l === 0,
                  VP_NAME1_ROWSPAN: params_3_2.length,
                  VP_NAME1_FIRST_ROW: l === 0,
                  VP_NAME2_ROWSPAN: params_3_1.length,
                  VP_NAME2_FIRST_ROW: l === 0,

                })
                data_key = data_key + 1
              })
            })
          })
          return
      }
    })

    return (
      <div>
        <Table columns={columns} dataSource={data} bordered pagination={false}/>
        <Button onClick={() => this.props.backToSubmitPage()}>检查输入数据</Button>
        <Button onClick={() => this.props.backToSubmitPage()}>保存结果</Button>
        <Button onClick={() => this.props.backToSubmitPage()}>放弃测量</Button>
      </div>
    )
  }
}