import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import CountUp from 'react-countup'
import Sidebar from 'react-sidebar'
import Header from './Header.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { startSetUser, startDivvy } from '../actions/app'

class DashboardPage extends Component {
  state = {
    render: true,
    slider: 0,
    income: '',
    divvyCreatedAt: moment()
  }

  // componentDidMount = () => {
  //   this.props.startSetUser({ email: this.props.email })
  //   setTimeout(() => {
  //     this.setState({ render: true })
  //   }, 0)
  // }

  simplifyNumber = num => {
    let amount = num.toString()
    // console.log('amount: ', num.toString())
    // console.log('length: ', num.toString().length)
    if (amount.length > 3 && amount.length < 7) {
      if (amount.length === 4) {
        return `${amount[0]}k`
      }
      if (amount.length === 5) {
        return `${amount[0]}${amount[1]}k`
      }
      if (amount.length === 6) {
        return `${amount[0]}${amount[1]}${amount[2]}k`
      }
    } else if (amount.length >= 7 && amount.length < 10) {
      if (amount.length === 7) {
        return `${amount[0]}m`
      }
      if (amount.length === 8) {
        return `${amount[0]}${amount[1]}m`
      }
      if (amount.length === 9) {
        return `${amount[0]}${amount[1]}${amount[2]}m`
      }
    } else if (amount.length >= 10 && amount.length < 13) {
      if (amount.length === 10) {
        return `${amount[0]}b`
      }
      if (amount.length === 11) {
        return `${amount[0]}${amount[1]}b`
      }
      if (amount.length === 12) {
        return `${amount[0]}${amount[1]}${amount[2]}b`
      }
    } else {
      return num
    }
  }

  scrollLeft = () => {
    this.slider.scrollLeft -= 230
    this.setState(state => ({ slider: state.slider - 230 }))
  }
  scrollRight = () => {
    this.slider.scrollLeft += 230
    this.setState(state => ({ slider: state.slider + 230 }))
  }

  onIncomeChange = ({ target }) => {
    const regex = /^\d{1,}(\.\d{0,2})?$/

    if (!target.value || target.value.match(regex)) {
      this.setState(() => ({ income: target.value }))
    }
  }

  onDivvy = e => {
    e.preventDefault()

    const { email, startDivvy } = this.props

    console.log('ssending income: ', parseFloat(this.state.income, 10) * 100)

    startDivvy({
      email,
      income: parseFloat(this.state.income, 10) * 100, // convert to pennies
      createdAt: this.state.divvyCreatedAt
    })
  }

  render = () => {
    const { editMode, newPoints, wants, needs } = this.props

    let renderContainer = false

    if (this.state.render) {
      renderContainer = (
        <div className="main-body">
          {this.props.editMode === true && (
            <div className="edit-title">
              <p className="title">Edit Mode</p>
              <button className="save">Save Changes</button>
            </div>
          )}
          <form
            className="divvy-container"
            onSubmit={this.onDivvy}
            style={{ marginTop: editMode === false ? 31 : 0 }}
          >
            <h2 className="title">Income</h2>
            {wants.length === 0 &&
              needs.length === 0 &&
              newPoints === 100 && (
                <input
                  className="input"
                  type="text"
                  placeholder={`create want or need from sidebar`}
                  disabled
                />
              )}
            {newPoints > 0 &&
              newPoints < 100 && (
                <input
                  className="input"
                  type="text"
                  placeholder={`${newPoints} points still need to be used`}
                  disabled
                />
              )}
            {newPoints === 0 && (
              <input
                className="input"
                type="text"
                placeholder="Enter income"
                name="income"
                value={this.state.income}
                onChange={this.onIncomeChange}
              />
            )}

            {newPoints > 0 &&
              newPoints <= 100 && (
                <button className="button" type="submit" disabled>
                  Split
                </button>
              )}
            {newPoints === 0 && (
              <button className="button" type="submit">
                Split
              </button>
            )}
          </form>
          {this.props.editMode === false && (
            // normal mode
            <div>
              <div className="header">
                <h2>Wants</h2>
                <p>({this.props.wants.length})</p>
              </div>
              {/* if number of wants equals 0 (warning message) */}
              {wants.length === 0 && (
                <div className="empty-container">
                  <p>You have not created any wants.</p>
                </div>
              )}
              {/* if number of wants exceeds 4 (slide gallery) */}
              {this.props.wants.length > 4 && (
                <div className="slider-container">
                  {this.state.slider > 50 && (
                    <FontAwesomeIcon
                      icon="angle-left"
                      className="nav-arrow want-arrow-left"
                      onClick={this.scrollLeft}
                    />
                  )}
                  <FontAwesomeIcon
                    icon="angle-right"
                    className="nav-arrow want-arrow-right"
                    onClick={this.scrollRight}
                  />
                  <div
                    className="slider"
                    ref={slider => (this.slider = slider)}
                  >
                    <div className="container">
                      {this.props.wants.map((want, i) => (
                        <Link
                          key={want._id}
                          to={`/wants/${want._id}`}
                          className="card want"
                        >
                          <div className="top">
                            <div
                              className="image"
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
                          <div className="meta">
                            <div className="block">
                              <h3>progress</h3>
                              <p>
                                <span className="dollar-symbol">$</span>
                                <Countup
                                  start={0}
                                  end={want.progress / 100}
                                  duration={2.75}
                                  useEasing={true}
                                />
                              </p>
                            </div>
                            <div className="block">
                              <h3>goal</h3>
                              <p>
                                <span className="dollar-symbol">$</span>
                                {this.simplifyNumber(want.goal / 100)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* if number of wants less than 4 (no slide gallery) */}
              {this.props.wants.length > 0 &&
                this.props.wants.length < 5 && (
                  <div className="container">
                    {this.props.wants.map((want, i) => (
                      <Link
                        key={want._id}
                        to={`/wants/${want._id}`}
                        className="card want"
                      >
                        <div className="top">
                          <div
                            className="image"
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
                        <div className="meta">
                          <div className="block">
                            <h3>progress</h3>
                            <p>
                              <span className="dollar-symbol">$</span>
                              <CountUp
                                ref={progress => {
                                  this.progress = progress
                                }}
                                start={0}
                                end={want.progress / 100}
                                duration={5}
                                useEasing={true}
                              />
                              {/* {this.simplifyNumber(want.progress / 100)} */}
                            </p>
                          </div>
                          <div className="block">
                            <h3>goal</h3>
                            <p>
                              <span className="dollar-symbol">$</span>
                              {this.simplifyNumber(want.goal / 100)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

              <div className="header">
                <h2>Needs</h2>
                <p>({this.props.needs.length})</p>
              </div>
              {this.props.needs.length > 0 ? (
                <div className="container">
                  {this.props.needs.map((need, i) => (
                    <Link
                      key={need._id}
                      to={`/need/${need._id}`}
                      className="card need"
                    >
                      <div className="top">
                        <div
                          className="image"
                          id={need.wallpaper}
                          style={{
                            background: `url(${
                              need.wallpaper
                            }) center / cover no-repeat`
                          }}
                        />
                        <div className="percent">
                          <p className="text">{need.percent}</p>
                          <p className="symbol">%</p>
                        </div>
                        <h2 className="name">{need.name}</h2>
                      </div>
                      <div className="meta">
                        <div className="block">
                          <h3>payment</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {this.simplifyNumber(need.payment)}
                          </p>
                        </div>
                        <div className="block">
                          <h3>method</h3>
                          <p>{need.method}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="empty-container">
                  <p>You have not created any needs.</p>
                </div>
              )}
            </div>
          )}

          {this.props.editMode === true && (
            // edit mode
            <div>
              <div className="header">
                <h2>Wants</h2>
                <p>({this.props.wants.length})</p>
              </div>
              {this.props.wants.length > 0 ? (
                <div className="container">
                  {this.props.wants.map((want, i) => (
                    <div key={want._id} className="card want">
                      <div className="top">
                        <div
                          className="image"
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
                      <div className="meta">
                        <div className="block">
                          <h3>progress</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {this.simplifyNumber(want.progress / 100)}
                          </p>
                        </div>
                        <div className="block">
                          <h3>goal</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {this.simplifyNumber(want.goal / 100)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="container">
                  <p>You have not created any needs.</p>
                </div>
              )}

              <div className="header">
                <h2>Needs</h2>
                <p>({this.props.needs.length})</p>
              </div>
              {this.props.needs.length > 0 ? (
                <div className="container">
                  {this.props.needs.map((need, i) => (
                    <div key={need._id} className="card need">
                      <div className="top">
                        <div
                          className="image"
                          id={need.wallpaper}
                          style={{
                            background: `url(${
                              need.wallpaper
                            }) center / cover no-repeat`
                          }}
                        />
                        <div className="percent">
                          <FontAwesomeIcon
                            icon="angle-left"
                            className="angleleft"
                          />
                          <p className="text">{need.percent}</p>
                          <p className="symbol">%</p>
                          <FontAwesomeIcon
                            icon="angle-right"
                            className="angleright"
                          />
                        </div>
                        <h2 className="name">{need.name}</h2>
                      </div>
                      <div className="meta">
                        <div className="block">
                          <h3>payment</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {this.simplifyNumber(need.payment)}
                          </p>
                        </div>
                        <div className="block">
                          <h3>method</h3>
                          <p>{need.method}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-container">
                  <p>You have not created any needs.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )
    }
    return renderContainer
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.sidebarOpen,
  editMode: state.app.editMode,
  email: state.auth.email,
  newPoints: state.app.newPoints,
  wants: state.wants,
  needs: state.needs
})

export default connect(mapStateToProps, { startSetUser, startDivvy })(
  DashboardPage
)
