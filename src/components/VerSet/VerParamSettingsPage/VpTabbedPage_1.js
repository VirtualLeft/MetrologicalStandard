import React from 'react'
import Enumerable from 'linq'
import VpList from './VpList'
import VpParam from '../../../mscommon/VpParam'

const VpTabbedPage_1 = (props) => {
  let paramsSelected = VpParam.getParamsByBelong(props.params, props.ID)
  let unitsSelected = paramsSelected.length > 0 ? Enumerable.from(props.units).where(x => x.PARAM_TYPE === paramsSelected[0].PARAM_TYPE).orderBy(x => parseFloat(x.PARAM_RATIO)).toArray(): props.units
  if (paramsSelected.length <= 0 || unitsSelected.length <= 0)
    return (<div/>)
  else
    return (
      <VpList {...props}
              params={paramsSelected}
              units={unitsSelected}
              parent={props.ID}
              firstLevel={true}
      />
    )
}

export default VpTabbedPage_1