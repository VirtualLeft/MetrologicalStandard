import React from 'react'
import Enumerable from 'linq'
import VpList from './VpList'
import VpParam from '../../../mscommon/VpParam'
import {Tabs, Radio} from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const TabPane = Tabs.TabPane

export default class VpTabbedPage_3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentRadioButton: 0}
  }

  setCurrentRadioButton(value) {
    this.setState({...this.state, currentRadioButton:value})
  }

  getCurrentVpList(paramsSelected_2) {
    const {params, units} = this.props
    if(!paramsSelected_2[this.state.currentRadioButton] || !paramsSelected_2[this.state.currentRadioButton].hasOwnProperty("ID"))
      return(<div></div>)
    let parentID = paramsSelected_2[this.state.currentRadioButton].ID
    let paramsSelected_3 = VpParam.getParamsByParent(params, parentID)
    let unitsSelected_3 = paramsSelected_3.length > 0 ? VpParam.getUnitsByType(units, paramsSelected_3[0].PARAM_TYPE): units
    return(
      <VpList {...this.props}
        params={paramsSelected_3}
        units={unitsSelected_3}
        parent={parentID}
        firstLevel={false}
      />
      )
  } 

  render() {
  const {params, ID, units} = this.props
  let paramsSelected_1 = VpParam.getParamsByBelong(params, ID)
  let unitsSelected_1 = paramsSelected_1.length > 0 ? VpParam.getUnitsByType(units, paramsSelected_1[0].PARAM_TYPE): units
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left" style={{minHeight: 600}}>
          {
            paramsSelected_1.map((param_1, i) => {
              let {paramValue, paramUnit} = VpParam.translate(param_1, unitsSelected_1)
              let paramsSelected_2 = VpParam.getParamsByParent(params, param_1.ID)
              let unitsSelected_2 = paramsSelected_2.length > 0 ? VpParam.getUnitsByType(units, paramsSelected_2[0].PARAM_TYPE): units
              return (
                <TabPane tab={`${paramValue}${paramUnit}`} key={i + 1}>
                    <RadioGroup onChange={(e) => this.setCurrentRadioButton(e.target.value)} defaultValue={0}>
                    {paramsSelected_2.map((param_2, i) => {
                      let {paramValue, paramUnit} = VpParam.translate(param_2, unitsSelected_2)
                      return(<RadioButton value={i} key={i}>{`${paramValue}${paramUnit}`}</RadioButton>)
                    })}
                    <RadioButton value={"edit"} key={"edit"}>{"编辑"}</RadioButton>
                    </RadioGroup>
                    {
                      this.state.currentRadioButton !== "edit" ? this.getCurrentVpList(paramsSelected_2)
                      :
                            <VpList {...this.props}
                              params={paramsSelected_2}
                              units={unitsSelected_2}
                              parent={param_1.ID}
                              firstLevel={false}
                            />
                    }
                </TabPane>
              )
            })
          }
          <TabPane tab="编辑" key={paramsSelected_1.length + 1}>
            <VpList {...this.props}
                    params={paramsSelected_1}
                    units={unitsSelected_1}
                    parent={ID}
                    firstLevel={true}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
