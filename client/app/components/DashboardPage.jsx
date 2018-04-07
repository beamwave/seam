import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from 'react-sidebar'
import Header from './Header.jsx'

class DashboardPage extends Component {
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
        {this.props.accounts !== undefined ? (
          this.props.accounts.map(account => (
            <div>
              <h2>account.name</h2>
              <p>account.percent</p>
              <p>account.total</p>
            </div>
          ))
        ) : (
          <div>
            <p>(0)</p>
            <p>You have no accounts</p>
          </div>
        )}
        <button>Create Need</button>

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
        <button>Create Want</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.sidebarOpen
})

export default connect(mapStateToProps)(DashboardPage)
