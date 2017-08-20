import React from 'react'
import {Button, Icon} from 'antd'
import VpListItem from './VpListItem'
import Transition from '../../../transition'

const StrechOut = Transition.StrechOut
export default class VpList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showAddForm: false, test: true}
  }

  render() {
    return (
      <div className="vplist">
        {
          this.props.params.map((param, i) => (
            <VpListItem {...this.props} key={i + 1}
                        param={param} type="edit"/>
          ))
        }
        {this.state.showAddForm ?
          <StrechOut transitionAppearTimeout={300}>
            <VpListItem type="add"
                        {...this.props}
                        parent={this.props.parent}
                        cancelAdd={() => this.setState({...this.state, showAddForm: false})}/>
          </StrechOut> : null}

        {/*此处overflow-hidden对Button不生效，因此用div再包一层*/}
        <div style={{display: "inline-block", overflow: "hidden"}}>
          <Button className="vplist_item"
                  disabled={this.state.showAddForm}
                  onClick={() => this.setState({...this.state, showAddForm: true})}>
            <Icon type="plus"/>增加
          </Button>
        </div>
      </div>
    )
  }
}