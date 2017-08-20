import React from 'react'

export default class VdStepContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>{this.props.ID}</div>
    )
  }
}