import React from 'react'
import VpList from './VpList'
import VpParam from '../../../mscommon/VpParam'

export default class VpTabbedPage_1 extends React.Component {
  render() {
    const {params, ID, units} = this.props
    let paramsSelected = VpParam.getParamsByBelong(params, ID)
    let unitsSelected = paramsSelected.length > 0 ? VpParam.getUnitsByType(units, paramsSelected[0].PARAM_TYPE) : units
    return (<VpList {...this.props}
                    params={paramsSelected}
                    units={unitsSelected}
                    parent={ID}
                    firstLevel={true}/>)

  }
}

