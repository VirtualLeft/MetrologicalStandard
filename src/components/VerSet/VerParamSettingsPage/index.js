import React from 'react'
import MsComponent from '../../../mscommon'
import {Tabs, Spin} from 'antd'
import "../../../../public/css/verparamsettings.less"
import VpTabbedPage_1 from './VpTabbedPage_1'
import VpTabbedPage_2 from './VpTabbedPage_2'
import VpTabbedPage_3 from './VpTabbedPage_3'

const TabPane = Tabs.TabPane

const TabbedPage = (props, type) => {
  switch (parseInt(type.VP_DEEP)) {
    case 1:
      return (<VpTabbedPage_1 {...props} ID={type.ID} />)
    case 2:
      return (<VpTabbedPage_2 {...props} ID={type.ID} />)
    case 3:
      return (<VpTabbedPage_3 {...props} ID={type.ID} />)
    default:
      return (<div>该项无参数！</div>)
  }
}

export default class VerParamSettingsPage extends MsComponent {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    this.props.verTypesGet()
      .then(() => this.props.verParamGet())
      .then(() => this.props.verUnitsGet())
      .then(this.setState({...this.state, loading: false}))
  }

  render() {
    const {types} = this.props
    return (
      <div className="verParamSettingsPage">
        <Spin size="large" spinning={this.state.loading}>
          <Tabs defaultActiveKey="1" type="card">
            {
              types.map((type, i) => (
                <TabPane tab={type.VP_NAME} key={i + 1}>
                  {TabbedPage(this.props, type)}
                </TabPane>
              ))
            }
          </Tabs>
        </Spin>
      </div>
    )
  }
}

