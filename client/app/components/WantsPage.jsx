import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gallery from './Gallery.jsx'
import { startSetUser } from '../actions/app'

export class WantsPage extends Component {
  // componentDidMount = () => {
  //   this.props.startSetUser({ email: this.props.email })
  // }

  render = () => {
    const { name, goal, percent, _id, description } = this.props.want

    return (
      <div className="want-page">
        <header className="want-header">
          <div className="primary-header">
            <h2 className="name">{name}</h2>
          </div>
          <div className="want-subhead">
            <div className="description">
              <h3>Description</h3>
              {description.length > 0 ? (
                <p>{description}</p>
              ) : (
                <p>You have not given this account a description.</p>
              )}
            </div>
            <div className="percent">
              <h3>Percent</h3>
              <p>{percent}</p>
            </div>
          </div>
        </header>
        <main className="want-body">
          <div className="goal">
            <h3>Goal</h3>
            <p>{goal}</p>
          </div>
          <div className="gallery">
            <Gallery id={_id} url={this.props.match.params.id} />
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  email: state.auth.email,
  want: state.wants.find(want => want._id === props.match.params.id)
})

export default connect(mapStateToProps, { startSetUser })(WantsPage)
