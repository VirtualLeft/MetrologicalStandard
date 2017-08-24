import React from 'react'
import VdStepContent_1 from './VdStepContent_1'
import VdStepContent_2 from './VdStepContent_2'
import VdStepContent_3 from './VdStepContent_3'

const VdStepContentByDeep = (props, deep) => {
  switch (parseInt(deep)) {
    case 1:
      return <VdStepContent_1 ref="vdStepContent_i" {...props}/>
    case 2:
      return <VdStepContent_2 ref="vdStepContent_i" {...props}/>
    case 3:
      return <VdStepContent_3 ref="vdStepContent_i" {...props}/>
    default:
      return <div>error</div>
  }
}

export default class VdStepContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let deep = this.props.type.VP_DEEP
    return (
      <div>
        {/*<VdStepContent_1 ref="vdStepContent_i" columnCount={6} {...this.props}/>*/}
        {VdStepContentByDeep(this.props, deep)}
      </div>
    )
  }
}
