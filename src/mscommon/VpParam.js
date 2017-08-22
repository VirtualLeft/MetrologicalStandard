import Enumerable from 'linq'
import _ from 'lodash'

export default class VpParam {
  static getParamsByBelong(params, belongID) {
    return Enumerable.from(params).where(x => x.PARAM_BELONG === belongID).orderBy(x => parseFloat(x.PARAM_VALUE)).toArray()
  }
  static getParamsByParent(params, parentID) {
    return Enumerable.from(params).where(x => x.PARAM_PARENT === parentID).orderBy(x => parseFloat(x.PARAM_VALUE)).toArray()
  }

  static getGradationByType(types, typeID) {
    return Enumerable.from
  }

  static getUnitsByType(units, unitType) {
    return Enumerable.from(units).where(x => x.PARAM_TYPE === unitType).orderBy(x => parseFloat(x.PARAM_RATIO)).toArray()
  }

  static compareValue(oriValue, newValue) {
    return (Math.abs(Math.floor(Math.log(newValue) / Math.LN10)) < Math.abs(Math.floor(Math.log(oriValue) / Math.LN10)))
  }

  static translate(param, units) {
    if (!_.isEmpty(param) && !_.isEmpty(units) && _.isArray(units)) {
      let tmpValue = param.PARAM_VALUE
      let tmpUnit = Enumerable.from(units).where(x => parseFloat(x.PARAM_RATIO) === 1.0).toArray()[0].PARAM_UNIT
      units.map((unit) => {
        let roundValue = param.PARAM_VALUE / parseFloat(unit.PARAM_RATIO)
        if (VpParam.compareValue(tmpValue, roundValue)) {
          tmpValue = roundValue
          tmpUnit = unit.PARAM_UNIT
        }
      })
      return {paramValue: tmpValue, paramUnit: tmpUnit}
    }
    else
      return {paramValue: "", paramUnit: ""}
  }

  static translateValue(paramValue, paramUnit, units) {
    let t_unit = Enumerable.from(units).where(x => x.PARAM_UNIT === paramUnit).toArray()
    return parseFloat(paramValue) * parseFloat(t_unit[0].PARAM_RATIO)
  }
}

