import React from 'react'
import VpParam from '../../../mscommon/VpParam'
import Enumerable from 'linq'
import VdTable from './VdTable'

export default class VdStepContent_1 extends React.Component {
  initCachedDataFromStore() {
    this.paramsSelected = VpParam.getParamsByBelong(this.props.params, this.props.type.ID)
    this.cachedData = []
    this.paramsSelected.map((param, j) => {
      let dataCell = {}
      dataCell["key"] = `[${j}]`
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
  }

  setCachedData(id, rowIndex, value) {
    Enumerable.from(this.cachedData).first(x => x.ID === id)[`data_${rowIndex + 1}`] = value
  }

  saveCachedData() {
    this.props.vfcCachedDataSet(this.cachedData, this.props.index)
  }

  render() {
    this.initCachedDataFromStore()
    let paramsSelected = this.paramsSelected
    let unitsSelected = paramsSelected.length > 0 ? VpParam.getUnitsByType(this.props.units, paramsSelected[0].PARAM_TYPE) : this.props.units
    if (paramsSelected.length <= 0 || unitsSelected.length <= 0)
      return (<div/>)
    else
      return (
        <VdTable {...this.props}
                 ref="vdTable"
                 params={paramsSelected}
                 units={unitsSelected}
                 dataSource={this.cachedData}
                 setCachedData={(id, rowIndex, value) => this.setCachedData(id, rowIndex, value)}
                 firstLevel={true}
        />
      )
  }
}