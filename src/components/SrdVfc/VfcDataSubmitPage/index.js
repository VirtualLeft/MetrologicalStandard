import React from 'react'
import MsComponent from '../../../mscommon/MsComponent'
import {Steps, Spin, Button, Row, Col} from 'antd'
import '../../../../public/css/vfcdatasubmit.less'
import VdStepContent from './VdStepContent'

const Step = Steps.Step

export default class VfcDataSubmitPage extends MsComponent {
  constructor(props) {
    super(props)
    this.state = {loading: true, stepCurrent: 0}
  }

  stepNext() {
    let vdtableDom = this.refs.vdStepContent.refs.vdStepContent_i
    let current = this.state.stepCurrent + 1
    this.setState({...this.state, stepCurrent: current})
    vdtableDom.saveCachedData()
  }

  stepPrev() {
    let vdtableDom = this.refs.vdStepContent.refs.vdStepContent_i
    let current = this.state.stepCurrent - 1
    this.setState({...this.state, stepCurrent: current})
    vdtableDom.saveCachedData()
  }

  componentDidMount() {
    this.props.verTypesGet()
      .then(() => this.props.verParamGet())
      .then(() => this.props.verUnitsGet())
      .then(this.setState({...this.state, loading: false}))
  }

  componentWillUnmount() {
    this.props.vfcCachedDataClear()
  }

  render() {
    const {types} = this.props
    const {stepCurrent} = this.state
    let type = types.length > 0 ? types[stepCurrent] : 0
    return (
      <div id="vfcdatasubmit">
        <Spin size="large" spinning={this.state.loading} style={{display: "inline-block"}}>
          <Steps current={stepCurrent}>
            {types.map((type, i) => (
              <Step key={i + 1} title={type.VP_NAME}/>
            ))}
          </Steps>
          <div className="steps-content">
            <VdStepContent ref="vdStepContent" {...this.props} type={type} index={stepCurrent}/>
          </div>
          <div className="steps-action">
            {
              stepCurrent < types.length - 1
              &&
              <Button type="primary" onClick={() => this.stepNext()}>继续</Button>
            }
            {
              stepCurrent === this.props.types.length - 1
              &&
              <Button type="primary" onClick={() => this.operateSuccess()}>完成</Button>
            }
            {
              stepCurrent > 0
              &&
              <Button style={{marginLeft: 8}} onClick={() => this.stepPrev()}>后退</Button>
            }
          </div>
        </Spin>
      </div>
    )
  }
}