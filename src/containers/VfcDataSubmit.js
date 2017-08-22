import React from 'react'
import { connect } from 'react-redux'
import { VfcDataSubmitPage } from "../components/SrdVfc";
import * as veraction from '../actions/verset/verparamsettings'
import * as vfcaction from '../actions/srdvfc/vfcdatasubmit'

const mapDispatchToProps = (dispatch) => ({
  verTypesGet: () => dispatch(veraction.verTypesGet()),
  verUnitsGet: () => dispatch(veraction.verUnitsGet()),
  verParamGet: () => dispatch(veraction.verParamGet()),
  vfcCachedDataSet: (cachedData, id) => dispatch(vfcaction.vfcCachedDataSet(cachedData, id)),
  vfcCachedDataClear: () => dispatch(vfcaction.vfcCachedDataClear())
})

const mapStateToProps = (state) => ({
  types: state.verset.verparamsettings.types,
  params: state.verset.verparamsettings.params,
  units: state.verset.verparamsettings.units,
  cachedDataGroup: state.srdvfc.vfcdatasubmit.cachedDataGroup,
  isPending: state.verset.verparamsettings.isPending,
  isRejected: state.verset.verparamsettings.isRejected,
  isFulfilled: state.verset.verparamsettings.isFulfilled,
})

const VfcDataSubmit = connect(
  mapStateToProps,
  mapDispatchToProps
)(VfcDataSubmitPage)

export default VfcDataSubmit
