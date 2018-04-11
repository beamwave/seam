import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gallery from './Gallery.jsx'
import { startSetUser } from '../actions/app'

export class WantsPage extends Component {
  // componentDidMount = () => {
  //   this.props.startSetUser({ email: this.props.email })
  // }

  render = () => (
    <div>
      <h2>{this.props.want.name}</h2>
      <h3>Goal</h3>
      <p>{this.props.want.goal}</p>

      <h3>Percent</h3>
      <p>{this.props.want.percent}</p>
      <Gallery id={this.props.want._id} url={this.props.match.params.id} />
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  email: state.auth.email,
  want: state.wants.find(want => want._id === props.match.params.id)
})

export default connect(mapStateToProps, { startSetUser })(WantsPage)
