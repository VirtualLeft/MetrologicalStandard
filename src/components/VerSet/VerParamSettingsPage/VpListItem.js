import React from 'react'
import {Input, Select, Row, Col, Popconfirm} from 'antd'
import VpUnitTrans from './VpUnitTrans'
import _ from "lodash"
import Transition from '../../../transition'

const Option = Select.Option
const InputGroup = Input.Group
const Fade = Transition.Fade
const ValueBox = (props) => (
  props.type === "add" ||
  props.editMode ?
    <div className="vplist_item_name">
      <InputGroup compact>
        <Input style={{width: "60%"}}
               defaultValue={props.paramValue}
               onChange={e => props.valueChange(e)}/>
        <Select style={{width: "40%"}}
                defaultValue={props.paramUnit}
                onChange={value => props.unitChange(value)}>
          {
            props.units.map((unit, i) => (
              <Option value={unit.PARAM_UNIT} key={i}>{unit.PARAM_UNIT}</Option>
            ))
          }
        </Select>
      </InputGroup>
    </div> :
    <span className="vplist_item_name">{`${props.paramValue}${props.paramUnit}`}</span>
)

const OperateBox = (props) => {
  let handleClick_1 = props.type === "add" ? props.verParamAdd : !props.editMode ? props.enterEditMode : props.verParamUpdate
  let handleClick_2 = props.type === "add" ? props.cancelAdd : !props.editMode ? props.verParamDelete : props.quitEditMode
  return (
    <div>
      <a className="vplist_item_opreate"
         onClick={() => handleClick_1()}>
        {props.type === "add" || (props.type === "edit" && props.editMode) ? "保存" : "修改"}
      </a>
      {
        props.type === "edit" && !props.editMode ?
          <Popconfirm title="删除该参数?" onConfirm={() => handleClick_2()}>
            <a className="vplist_item_opreate">
              删除
            </a>
          </Popconfirm>
          :
          <a className="vplist_item_opreate" onClick={() => handleClick_2()}>
            取消
          </a>
      }


    </div>
  )
}

export default class VpListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editMode: false}
  }

  enterEditMode() {
    this.setState({...this.state, editMode: true})
  }

  quitEditMode() {
    this.setState({...this.state, editMode: false})
  }

  valueChange(e) {
    this.paramValue = e.target.value
  }

  unitChange(value) {
    this.paramUnit = value
  }

  verParamUpdate() {
    if (!_.isEmpty(this.paramValue) || !_.isEmpty(this.paramUnit)) {
      this.props.param.PARAM_NAME = `${this.paramValue}${this.paramUnit}`
      this.props.param.PARAM_VALUE = VpUnitTrans.translateValue(this.paramValue, this.paramUnit, this.props.units)
    }
    this.props.verParamUpdate(this.props.param)
      .then(this.quitEditMode())
  }

  verParamDelete() {
    if (this.props.param.ID) {
      this.props.verParamDelete(this.props.param)
        .then(this.quitEditMode())
    }
  }

  verParamAdd() {
    let param = {}
    if (!_.isEmpty(this.paramValue) && !_.isEmpty(this.paramUnit)) {
      console.log(this.props.units)
      param.PARAM_NAME = `${this.paramValue}${this.paramUnit}`
      param.PARAM_VALUE = VpUnitTrans.translateValue(this.paramValue, this.paramUnit, this.props.units)
      param.PARAM_TYPE = this.props.units[0].PARAM_TYPE
      this.props.firstLevel ? param.PARAM_BELONG = this.props.parent : param.PARAM_PARENT = this.props.parent
      this.props.verParamAdd(param)
        .then(this.props.cancelAdd())
    }
    else {
      this.props.cancelAdd()
    }
  }

  render() {
    let {paramValue, paramUnit} = VpUnitTrans.translate(this.props.param, this.props.units)
    this.paramValue = paramValue
    this.paramUnit = paramUnit
    return (
      <div className="vplist_item">
        <Fade transitionAppear={this.props.type === "add"} transitionAppearTimeout={1000}>
          <Row>
            <Col span={16}>
              <ValueBox units={this.props.units} editMode={this.state.editMode} type={this.props.type}
                        paramValue={paramValue} paramUnit={paramUnit}
                        valueChange={(e) => this.valueChange(e)} unitChange={(value) => this.unitChange(value)}/>
            </Col>
            <Col span={8}>
              <OperateBox enterEditMode={() => this.enterEditMode()} editMode={this.state.editMode}
                          type={this.props.type}
                          quitEditMode={() => this.quitEditMode()} verParamUpdate={() => this.verParamUpdate()}
                          verParamDelete={() => this.verParamDelete()} verParamAdd={() => this.verParamAdd()}
                          cancelAdd={() => this.props.cancelAdd()}/>
            </Col>
          </Row>
        </Fade>
      </div>
    )
  }
}


