import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Header from './Header.jsx'

import { startSetUser } from '../actions/app'

class DashboardPage extends Component {
  componentDidMount = () => this.props.startSetUser({ email: this.props.email })

  state = {
    counters: []
  }

  render = () => {
    return (
      <div>
        <h2>Income</h2>
        <form>
          <input type="text" placeholder="add money to accounts..." />
          {this.props.accounts !== undefined ? (
            <button type="submit" disabled>
              Split
            </button>
          ) : (
            <button type="submit" disabled>
              Split
            </button>
          )}
        </form>
        <h2>Wants</h2>
        {this.props.wants.length > 0 ? (
          <div>
            <p>({this.props.wants.length})</p>
            {this.props.wants.map((want, i) => (
              <Link key={i} to="/dashboard">
                <h2>{want.name}</h2>
                <p>{want.percent}</p>
                <p>{want.goal}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p>(0)</p>
            <p>You have not created any wants.</p>
          </div>
        )}

        <h2>Needs</h2>
        {this.props.goals !== undefined ? (
          this.props.goals.map(goal => (
            <div>
              <h2>goal.name</h2>
              <p>goal.percent</p>
              <p>goal.total</p>
            </div>
          ))
        ) : (
          <div>
            <p>(0)</p>
            <p>You have no accounts</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.sidebarOpen,
  wants: state.wants,
  email: state.auth.email
})

export default connect(mapStateToProps, { startSetUser })(DashboardPage)
