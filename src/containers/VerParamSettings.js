import React from 'react'
import { connect } from 'react-redux'
import { VerParamSettingsPage } from '../components/VerSet'
import * as veraction from '../actions/verset/verparamsettings'

const mapDispatchToProps = (dispatch) => ({
  verTypesGet: () => dispatch(veraction.verTypesGet()),
  verUnitsGet: () => dispatch(veraction.verUnitsGet()),
  verParamGet: () => dispatch(veraction.verParamGet()),
  verParamUpdate: (param) => dispatch(veraction.verParamUpdate(param)),
  verParamAdd: (param) => dispatch(veraction.verParamAdd(param)),
  verParamDelete: (param) => dispatch(veraction.verParamDelete(param)),
})

const mapStateToProps = (state) => ({
  types: state.verset.verparamsettings.types,
  params: state.verset.verparamsettings.params,
  units: state.verset.verparamsettings.units,
  isPending: state.verset.verparamsettings.isPending,
  isRejected: state.verset.verparamsettings.isRejected,
  isFulfilled: state.verset.verparamsettings.isFulfilled,
})

const VerParamSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerParamSettingsPage)


export default VerParamSettings
