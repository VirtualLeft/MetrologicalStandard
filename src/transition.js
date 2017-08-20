import React from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import "../public/css/transition.less"

export default class Transition {
  static StrechOut = props => {
    let strechOutContainer = {maxWidth: props.width ? `${props.width}px` : "100%", display: "inline-block"}
    return(
      <div style={strechOutContainer}>
        <CSSTransitionGroup
          transitionName="strechOut"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
          {...props}>
          {props.children}
        </CSSTransitionGroup>
      </div>
    )
  }

  static Fade = props => {
    return (
      <CSSTransitionGroup
        transitionName="fadeAppear"
        transitionAppear={false}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionEnterTimeout={500}
        transitionLeave={false}
        transitionLeaveTimeout={500}
        {...props}>
        {props.children}
      </CSSTransitionGroup>
    )
  }
}