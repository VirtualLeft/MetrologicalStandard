import React from 'react'
import VpParam from '../../../mscommon/VpParam'
import VdTable from './VdTable'
import Enumerable from 'linq'
import {Collapse} from 'antd'

const Panel = Collapse.Panel;

export default class VdStepContent_2 extends React.Component {
  initCachedDataFromStore() {
    this.paramsSelected_1 = VpParam.getParamsByBelong(this.props.params, this.props.type.ID)
    this.cachedData = []
    this.paramsSelected_1.map((param_1, i) => {
      let paramsSelected_2 = VpParam.getParamsByParent(this.props.params, param_1.ID)
      paramsSelected_2.map((param, j) => {
        let dataCell = {}
        dataCell["key"] = `[${i}][${j}]`
        dataCell["PARAM_PARENT"] = param.PARAM_PARENT
        dataCell["ID"] = param.ID
        dataCell["PARAM_NAME"] = param.PARAM_NAME
        dataCell["dataCount"] = this.props.columnCount
        for (let k = 0; k < this.props.columnCount; k++) {
          dataCell[`data_${k + 1}`] = 0
          if (_.isArray(this.props.cachedDataGroup[this.props.index]) && this.props.cachedDataGroup[this.props.index].length !== 0) {
            let obj = Enumerable.from(this.props.cachedDataGroup[this.props.index]).where(x => x.ID === param.ID).toArray()
            dataCell[`data_${k + 1}`] = obj.length === 1 ? obj[0].hasOwnProperty(`data_${k + 1}`) ? obj[0][`data_${k + 1}`] : 0 : 0
          }
        }
        this.cachedData.push(dataCell)
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
        <Collapse accordion defaultActiveKey={'0'} key={this.props.index} >
          {paramsSelected_1.map((param, i) => {
            let {paramValue, paramUnit} = VpParam.translate(param, unitsSelected_1)
            let paramsSelected_2 = VpParam.getParamsByParent(this.props.params, param.ID)
            let unitsSelected_2 = paramsSelected_2.length > 0 ? VpParam.getUnitsByType(this.props.units, paramsSelected_2[0].PARAM_TYPE) : this.props.units
            return (
              <Panel header={`${paramValue}${paramUnit}`} key={i}>
                <VdTable {...this.props}
                         ref="vdTable"
                         params={paramsSelected_2}
                         units={unitsSelected_2}
                         dataSource={VpParam.getParamsByParent(this.cachedData, param.ID)}
                         setCachedData={(id, rowIndex, value) => this.setCachedData(id, rowIndex, value)}
                         firstLevel={true}
                />
              </Panel>
            )
          })}
        </Collapse>
      )
  }
}