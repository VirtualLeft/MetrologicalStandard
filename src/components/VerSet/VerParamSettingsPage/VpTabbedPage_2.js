import React from 'react'
import Enumerable from 'linq'
import VpList from './VpList'
import VpUnitTrans from './VpUnitTrans'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane

const VpTabbedPage_2 = (props) => {
  let paramsSelected_1 = Enumerable.from(props.params).where(x => x.PARAM_BELONG === props.ID).toArray()
  let unitsSelected_1 = paramsSelected_1.length > 0 ? Enumerable.from(props.units).where(x => x.PARAM_TYPE === paramsSelected_1[0].PARAM_TYPE).orderBy(x => parseFloat(x.PARAM_RATIO)).toArray() : props.units
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left" style={{minHeight: 600}}>
        {
          paramsSelected_1.map((param, i) => {
            let {paramValue, paramUnit} = VpUnitTrans.translate(param, unitsSelected_1)
            let paramsSelected_2 = Enumerable.from(props.params).where(x => x.PARAM_PARENT === param.ID).toArray()
            let unitsSelected_2 = paramsSelected_2.length > 0 ? Enumerable.from(props.units).where(x => x.PARAM_TYPE === paramsSelected_2[0].PARAM_TYPE).orderBy(x => parseFloat(x.PARAM_RATIO)).toArray() : props.units
            return (
              <TabPane tab={`${paramValue}${paramUnit}`} key={i + 1}>
                <VpList {...props}
                        params={paramsSelected_2}
                        units={unitsSelected_2}
                        parent={param.ID}
                        firstLevel={false}
                />
              </TabPane>
            )
          })
        }
        <TabPane tab="编辑" key={paramsSelected_1.length + 1}>
          <VpList {...props}
                  params={paramsSelected_1}
                  units={unitsSelected_1}
                  parent={props.ID}
                  firstLevel={true}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default VpTabbedPage_2