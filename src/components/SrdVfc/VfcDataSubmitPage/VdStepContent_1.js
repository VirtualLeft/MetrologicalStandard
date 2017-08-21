import React from 'react'
import VpParam from '../../../mscommon/VpParam'
import VdTable from './VdTable'

export default class VdStepContent_1 extends React.Component {
  render() {
    let paramsSelected = VpParam.getParamsByBelong(this.props.params, this.props.type.ID)
    let unitsSelected = paramsSelected.length > 0 ? VpParam.getUnitsByType(this.props.units, paramsSelected[0].PARAM_TYPE) : this.props.units
    if (paramsSelected.length <= 0 || unitsSelected.length <= 0)
      return (<div/>)
    else
      return (
        <VdTable {...this.props}
                 ref="currentVdTable"
                 params={paramsSelected}
                 units={unitsSelected}
                 rowCount={6}
                 firstLevel={true}
        />
      )
  }
}