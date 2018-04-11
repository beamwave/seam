import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Header from './Header.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { startSetUser } from '../actions/app'

class DashboardPage extends Component {
  componentDidMount = () => this.props.startSetUser({ email: this.props.email })

  render = () => {
    const { editMode } = this.props

    return (
      <div className="dashboard-body">
        {this.props.editMode === true && (
          <div className="edit-title">
            <p className="title">Edit Mode</p>
            <button className="save">Save Changes</button>
          </div>
        )}
        <form
          className="divvy-group"
          style={{ marginTop: editMode === false ? 57 : 0 }}
        >
          <label className="title">Income</label>
          <input
            className="input"
            type="text"
            placeholder="add money to accounts..."
          />
          {this.props.accounts !== undefined ? (
            <button className="button" type="submit" disabled>
              Split
            </button>
          ) : (
            <button className="button" type="submit" disabled>
              Split
            </button>
          )}
        </form>
        {this.props.wants.length > 0 &&
          this.props.editMode === false && (
            <div>
              <div className="wn-headers">
                <h2>Wants</h2>
                <p>({this.props.wants.length})</p>
              </div>
              <div className="wants-group">
                {this.props.wants.map((want, i) => (
                  <Link
                    key={want._id}
                    to={`/wants/${want._id}`}
                    className="want-card"
                  >
                    <div className="want-image">
                      <div
                        className="container"
                        id={want.wallpaper}
                        style={{
                          background: `url(${
                            want.wallpaper
                          }) center / cover no-repeat`
                        }}
                      />
                      <div className="percent">
                        <p className="text">{want.percent}</p>
                        <p className="symbol">%</p>
                      </div>
                      <h2 className="name">{want.name}</h2>
                    </div>
                    <div className="want-meta">
                      <div className="goal">
                        <h3>goal</h3>
                        <p>
                          <span className="dollar-symbol">$</span>
                          {want.goal}
                        </p>
                      </div>
                      <div className="progress">
                        <h3>progress</h3>
                        <p>
                          <span className="dollar-symbol">$</span>0
                        </p>
                        {/* <p>{want.progress}</p> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        {this.props.wants.length > 0 &&
          this.props.editMode === true && (
            <div>
              <div className="wn-headers">
                <h2>Wants</h2>
                <p>({this.props.wants.length})</p>
              </div>
              <div className="wants-group">
                {this.props.wants.map((want, i) => (
                  <div key={want._id} className="want-card">
                    <div className="want-image">
                      <div
                        className="container"
                        id={want.wallpaper}
                        style={{
                          background: `url(${
                            want.wallpaper
                          }) center / cover no-repeat`
                        }}
                      />
                      <div className="percent">
                        <FontAwesomeIcon
                          icon="angle-left"
                          className="angleleft"
                        />
                        <p className="text">{want.percent}</p>
                        <p className="symbol">%</p>
                        <FontAwesomeIcon
                          icon="angle-right"
                          className="angleright"
                        />
                      </div>
                      <h2 className="name">{want.name}</h2>
                    </div>
                    <div className="want-meta">
                      <div className="goal">
                        <h3>goal</h3>
                        <p>
                          <span className="dollar-symbol">$</span>
                          {want.goal}
                        </p>
                      </div>
                      <div className="progress">
                        <h3>progress</h3>
                        <p>
                          <span className="dollar-symbol">$</span>0
                        </p>
                        {/* <p>{want.progress}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        {this.props.wants.length === 0 &&
          this.props.editMode === false && (
            <div>
              <div className="wn-headers">
                <h2>Wants</h2>
                <p>(0)</p>
              </div>
              <p>You have not created any wants.</p>
            </div>
          )}
        {this.props.goals !== undefined ? (
          this.props.goals.map(goal => (
            <div>
              <div className="wn-headers">
                <h2>Needs</h2>
                <p>(0)</p>
              </div>
              <h2>goal.name</h2>
              <p>goal.percent</p>
              <p>goal.total</p>
            </div>
          ))
        ) : (
          <div>
            <div className="wn-headers">
              <h2>Needs</h2>
              <p>(0)</p>
            </div>
            <p>You have no accounts</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.sidebarOpen,
  editMode: state.app.editMode,
  wants: state.wants,
  email: state.auth.email
})

export default connect(mapStateToProps, { startSetUser })(DashboardPage)
