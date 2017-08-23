import Enumerable from 'linq'
import _ from 'lodash'
import Promise from 'bluebird'

export default class VpParam {
  static getParamsByBelong(params, belongID) {
    return Enumerable.from(params).where(x => x.PARAM_BELONG === belongID).orderBy(x => parseFloat(x.PARAM_VALUE)).toArray()
  }
  static getParamsByParent(params, parentID) {
    return Enumerable.from(params).where(x => x.PARAM_PARENT === parentID).orderBy(x => parseFloat(x.PARAM_VALUE)).toArray()
  }

  static getFirstLevelCountByID(params, ID) {
    return Enumerable.from(params).where(x => x.PARAM_BELONG === parentID).orderBy(x => parseFloat(x.PARAM_VALUE)).toArray().length
  }

  static getSecondLevelCountByID(params, ID) {
    let count = 0
    let params_1 = VpParam.getParamsByBelong(params, ID)
    params_1.map((param, i) => {
      count = count + VpParam.getParamsByParent(params, param.ID).length
    })
    return count
  }

  static getSecondLevelCountByParentID(params, ID) {
    let count = 0
    let params_1 = VpParam.getParamsByParent(params, ID)
    params_1.map((param, i) => {
      count = count + VpParam.getParamsByParent(params, param.ID).length
    })
    return count
  }

  static getThirdLevelCountByID(params, ID) {
    let count = 0
    let params_1 = VpParam.getParamsByBelong(params, ID)
    params_1.map((param_1, i) => {
      let params_2 = VpParam.getParamsByParent(params, param_1.ID)
      params_2.map((param_2, i) => {
        count = count + VpParam.getParamsByParent(params, param_2.ID).length
      })
    })
    return count
  }


  static getGradationByType(types, typeID) {
    return Enumerable.from
  }

  static getUnitsByType(units, unitType) {
    return Enumerable.from(units).where(x => x.PARAM_TYPE === unitType).orderBy(x => parseFloat(x.PARAM_RATIO)).toArray()
  }

  static getUnitByName(units, unitName) {
    return Enumerable.from(units).first(x => x.PARAM_UNIT === unitName)
  }

  static compareValue(oriValue, newValue) {
    return (Math.abs(Math.floor(Math.log(newValue) / Math.LN10)) < Math.abs(Math.floor(Math.log(oriValue) / Math.LN10)))
  }


  static translate(param, units) {
    if(units[0] && units[0].PARAM_TYPE === 0 && !_.isEmpty(param)){
      return {paramValue: param.PARAM_VALUE, paramUnit: ""}
    }
    if (!_.isEmpty(param) && !_.isEmpty(units) && _.isArray(units)) {
      let tmpValue = parseFloat(param.PARAM_VALUE)
      let tmpUnitValue = Enumerable.from(units).first(x => parseFloat(x.PARAM_RATIO) === 1.0).PARAM_UNIT
      units.map((unit) => {
        let roundValue = parseFloat(param.PARAM_VALUE) / parseFloat(unit.PARAM_RATIO)
        if (VpParam.compareValue(tmpValue, roundValue)) {
          tmpValue = roundValue
          tmpUnitValue = unit.PARAM_UNIT
        }
      })
      return {paramValue: tmpValue.toFixed(2), paramUnit: tmpUnitValue}
    }
    else
      return {paramValue: "", paramUnit: ""}
  }

  static translateValue(paramValue, paramUnit, units) {
    if(units.length > 0 && VpParam.getUnitByName(units, paramUnit).PARAM_TYPE === 0) {
      console.log(paramValue)
      return paramValue
    }
    let t_unit = Enumerable.from(units).where(x => x.PARAM_UNIT === paramUnit).toArray()
    return parseFloat(paramValue) * parseFloat(t_unit[0].PARAM_RATIO)
  }

  static runAvgCal(dataGroup) {
    return new Promise(function(resolve, reject) {
      dataGroup.map((dataList, i) => {
        dataList.map((data, j) => {
          for(let k = 1; k <= data.dataCount; k++) {
          }
        })
      })
    })
  }

  static runSdCal(dataGroup) {

  }
}

