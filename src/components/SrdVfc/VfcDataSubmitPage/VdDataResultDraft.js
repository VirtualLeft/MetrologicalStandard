import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'
import 'echarts/theme/macarons'

export default class VpDataResultDraft extends React.Component {
  componentDidMount() {
    const {record} = this.props

    let tm2017 = new Date(2017, 0, 3);
    let tm2018 = new Date(2018, 9, 3);
    console.log(tm2017, tm2018)
    let myChart = echarts.init(document.getElementById(`chart_${record.key}`), "macarons")
    myChart.setOption({
      title: {
        text: record.VP_NAME,
        subtext: record.PARAM_NAME
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: true},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      xAxis: [
        {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          boundaryGap: [0, '100%'],
          // axisLabel: {
          //   formatter: '{value} °C'
          // }
        }
      ],
      series: [
        {
          name: '模拟数据',
          type: 'line',
          // showSymbol: false,
          // hoverAnimation: false,
          data: [
            {
              name: tm2017.toString(),
              value: [
                tm2017,
                1234
              ]
            }, {
              name: tm2018.toString(),
              value: [
                [tm2018.getFullYear(), tm2018.getMonth(), tm2018.getDate()].join('/'),
                2345
              ]
            }
          ],
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        },
      ]
    })
  }

  render() {
    let key = this.props.record.key
    return (
      <div id={`chart_${key}`} style={{height: 400}}/>
    )
  }
}