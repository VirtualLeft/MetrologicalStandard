import React from 'react'
import MsComponent from '../../../mscommon/MsComponent'
import VpParam from '../../../mscommon/VpParam'
import {Steps, Spin, Button} from 'antd'
import '../../../../public/css/vfcdatasubmit.less'
import VpDataResult from './VpDataResult'
import VdStepContent from './VdStepContent'

const Step = Steps.Step

export default class VfcDataSubmitPage extends MsComponent {
  constructor(props) {
    super(props)
    this.state = {loading: true, stepCurrent: 0, page: "submit"}
  }

  stepNext() {
    let vdtableDom = this.refs.vdStepContent.refs.vdStepContent_i
    let current = this.state.stepCurrent + 1
    this.setState({...this.state, stepCurrent: current})
    vdtableDom.saveCachedData()
  }

  stepTo(nextStep) {
    let vdtableDom = this.refs.vdStepContent.refs.vdStepContent_i
    let current = this.state.stepCurrent + 1
    this.setState({...this.state, stepCurrent: nextStep})
    vdtableDom.saveCachedData()
  }

  stepPrev() {
    let vdtableDom = this.refs.vdStepContent.refs.vdStepContent_i
    let current = this.state.stepCurrent - 1
    this.setState({...this.state, stepCurrent: current})
    vdtableDom.saveCachedData()
  }

  checkSubmitedData() {

  }

  forwardToResultPage() {
    let vdtableDom = this.refs.vdStepContent.refs.vdStepContent_i
    vdtableDom.saveCachedData()
    this.checkSubmitedData()
    this.setState({...this.state, page: "result"})
  }

  backToSubmitPage() {
    this.setState({...this.state, page: "submit"})
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
      <Spin size="large" spinning={this.state.loading} style={{display: "inline-block"}}>
        {
          this.state.page === "submit" ?
          <div id="vfcdatasubmit">
            <Steps current={stepCurrent}>
              {types.map((type, i) => (
                <Step key={i + 1} title={type.VP_NAME} onClick={() => this.stepTo(i)} style={{cursor: "pointer"}}/>
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
                <Button type="primary" onClick={() => this.forwardToResultPage()}>提交</Button>
              }
              {
                stepCurrent > 0
                &&
                <Button style={{marginLeft: 8}} onClick={() => this.stepPrev()}>后退</Button>
              }
            </div>
          </div>
          :
            <VpDataResult {...this.props} backToSubmitPage={() => this.backToSubmitPage()} dataSource={this.props.cachedDataGroup}/>
        }
      </Spin>
    )
  }
}