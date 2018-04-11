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
    return (
      <div>
        {this.props.editMode === true && <p>Edit Mode</p>}
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
        {this.props.wants.length > 0 &&
          this.props.editMode === false && (
            <div>
              <div className="wants-header">
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
                        <p>{want.goal}</p>
                      </div>
                      <div className="progress">
                        <h3>progress</h3>
                        <p>0</p>
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
              <div className="wants-header">
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
                        <FontAwesomeIcon icon="angle-left" />
                        <p className="text">{want.percent}</p>
                        <p className="symbol">%</p>
                        <FontAwesomeIcon icon="angle-right" />
                      </div>
                      <h2 className="name">{want.name}</h2>
                    </div>
                    <div className="want-meta">
                      <div className="goal">
                        <h3>goal</h3>
                        <p>{want.goal}</p>
                      </div>
                      <div className="progress">
                        <h3>progress</h3>
                        <p>0</p>
                        {/* <p>{want.progress}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        {this.props.wants.length > 0 &&
          this.props.editMode === false && (
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
  editMode: state.app.editMode,
  wants: state.wants,
  email: state.auth.email
})

export default connect(mapStateToProps, { startSetUser })(DashboardPage)
