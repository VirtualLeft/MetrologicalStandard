import React from 'react'
import VpParam from '../../../mscommon/VpParam'
import VdTable from './VdTable'
import Enumerable from 'linq'
import {Collapse, Tabs} from 'antd'

const TabPane = Tabs.TabPane
const Panel = Collapse.Panel

export default class VdStepContent_3 extends React.Component {
  initCachedDataFromStore() {
    this.paramsSelected_1 = VpParam.getParamsByBelong(this.props.params, this.props.type.ID)
    this.cachedData = []
    this.paramsSelected_1.map((param, i) => {
      let paramsSelected_2 = VpParam.getParamsByParent(this.props.params, param.ID)
      paramsSelected_2.map((param_2, j) => {
        let paramsSelected_3 = VpParam.getParamsByParent(this.props.params, param_2.ID)
        paramsSelected_3.map((param_3, k) => {
          let dataCell = {}
          dataCell["key"] = `[${i}][${j}][${k}]`
          dataCell["PARAM_PARENT"] = param_3.PARAM_PARENT
          dataCell["PARAM_BELONG"] = param_3.PARAM_BELONG
          dataCell["ID"] = param_3.ID
          dataCell["PARAM_NAME"] = param_3.PARAM_NAME
          dataCell["dataCount"] = this.props.columnCount
          for (let l = 0; l < this.props.columnCount; l++) {
            dataCell[`data_${l + 1}`] = 0
            if (_.isArray(this.props.cachedDataGroup[this.props.index]) && this.props.cachedDataGroup[this.props.index].length !== 0) {
              let obj = Enumerable.from(this.props.cachedDataGroup[this.props.index]).where(x => x.ID === param_3.ID).toArray()
              dataCell[`data_${l + 1}`] = obj.length === 1 ? obj[0].hasOwnProperty(`data_${l + 1}`) ? obj[0][`data_${l + 1}`] : 0 : 0
            }
          }
          this.cachedData.push(dataCell)
        })
      })
    })
  }

  saveCachedData() {
    this.props.vfcCachedDataSet(this.cachedData, this.props.index)
  }

  setCachedData(id, rowIndex, value) {
    Enumerable.from(this.cachedData).first(x => x.ID === id)[`data_${rowIndex + 1}`] = value
  }

  render() {
    this.initCachedDataFromStore()
    let paramsSelected_1 = this.paramsSelected_1
    let unitsSelected_1 = this.paramsSelected_1.length > 0 ? VpParam.getUnitsByType(this.props.units, this.paramsSelected_1[0].PARAM_TYPE) : this.props.units
    if (paramsSelected_1.length <= 0 || unitsSelected_1.length <= 0)
      return (<div/>)
    else
      return (
        <Collapse accordion defaultActiveKey={'0'}>
          {paramsSelected_1.map((param, i) => {
            let {paramValue, paramUnit} = VpParam.translate(param, unitsSelected_1)
            let paramsSelected_2 = VpParam.getParamsByParent(this.props.params, param.ID)
            let unitsSelected_2 = paramsSelected_2.length > 0 ? VpParam.getUnitsByType(this.props.units, paramsSelected_2[0].PARAM_TYPE) : this.props.units
            return (
              <Panel header={`${paramValue}${paramUnit}`} key={i}>
                <Tabs defaultActiveKey="1" tabPosition="left">
                  {
                    paramsSelected_2.map((param_2, i) => {
                      let {paramValue, paramUnit} = VpParam.translate(param_2, unitsSelected_2)
                      let paramsSelected_3 = VpParam.getParamsByParent(this.props.params, param_2.ID)
                      let unitsSelected_3 = paramsSelected_3.length > 0 ? VpParam.getUnitsByType(this.props.units, paramsSelected_3[0].PARAM_TYPE) : this.props.units
                      return (
                        <TabPane tab={`${paramValue}${paramUnit}`} key={i + 1}>
                          <VdTable {...this.props}
                                   ref="vdTable"
                                   params={paramsSelected_3}
                                   units={unitsSelected_3}
                                   dataSource={VpParam.getParamsByParent(this.cachedData, param_2.ID)}
                                   setCachedData={(id, rowIndex, value) => this.setCachedData(id, rowIndex, value)}
                                   firstLevel={true}
                          />
                        </TabPane>
                      )
                    })
                  }
                </Tabs>
              </Panel>
            )
          })}
        </Collapse>
      )
  }
}