import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Line } from 'rc-progress'
import AutosizeInput from 'react-input-autosize'
import numeral from 'numeral'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import Gallery from './Gallery.jsx'
import { startSetUser } from '../actions/app'
import { updateWant } from '../actions/wants'
import { loadModal } from '../actions/modal'
import { SHARE_MODAL } from '../constants/modaltypes'

export class WantsPage extends Component {
  state = {
    dropdownOpen: false,
    shareModalOpened: false,
    editMode: false,
    name: this.props.want.name,
    goal: '',
    // goal: this.props.want.goal,
    percent: this.props.want.percent,
    description: this.props.want.description
  }

  // onFieldChange = ({ target }) => {
  //   this.setState({
  //     [target.name]: target.value
  //   })
  // }

  onSubmitChanges = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.onSave()
    }
  }

  listenKeyboard = e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      this.deactivateEditMode()
    }
  }

  onNameChange = ({ target }) => this.setState({ name: target.value })

  showShareModal = () => this.props.loadModal(SHARE_MODAL)

  incrementPercent = () =>
    this.setState(prevState => ({ percent: prevState.percent + 1 }))

  decrementPercent = () =>
    this.setState(prevState => ({ percent: prevState.percent - 1 }))

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  activateEditMode = () => {
    this.setState({ editMode: true })
    window.addEventListener('keydown', this.listenKeyboard, true)
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false, percent: this.props.want.percent })
    window.removeEventListener('keydown', this.listenKeyboard, true)
  }

  onGoalChange = ({ target }) => {
    const regex = /^\d{1,}(\.\d{0,2})?$/

    if (!target.value || target.value.match(regex)) {
      this.setState(() => ({ goal: target.value }))
    }
  }

  onSave = () => {
    const { _id } = this.props.want
    const { email, updateWant } = this.props
    const { name, percent, goal, description } = this.state

    const updatedGoal = +goal === 0 ? this.props.want.goal : +goal

    const data = {
      _id,
      email,
      name,
      goal: updatedGoal * 100,
      percent,
      description
    }

    updateWant(data).then(() => this.deactivateEditMode())
  }

  render = () => {
    // _id = id of specific want
    const {
      name,
      goal,
      progress,
      completed,
      percent,
      _id,
      description,
      shared
    } = this.props.want

    const {
      editMode,
      name: stateName,
      percent: statePercent,
      goal: stateGoal,
      description: stateDescription
    } = this.state

    return (
      <div className="want-page">
        <header className="want-header">
          {!editMode && (
            <div className="primary-header" onMouseLeave={this.turnOffDropdown}>
              <h2 className="name">{name}</h2>
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropdown}
                className="dropdown-root options"
                style={{ opacity: this.state.dropdownOpen ? 1 : 0 }}
              >
                <DropdownToggle className="dropdown-toggle">
                  <FontAwesomeIcon icon="ellipsis-h" className="ellipsis" />
                </DropdownToggle>
                <DropdownMenu
                  left="true"
                  className="dropdown-menu"
                  style={{
                    display:
                      this.state.dropdownOpen === false ? 'none' : 'block'
                  }}
                >
                  <DropdownItem
                    className="dropdown-item"
                    onClick={this.activateEditMode}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem className="dropdown-item">
                    Delete account
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
          {editMode && (
            <div className="primary-header-edit">
              <div className="title">
                <p className="text">Edit Mode</p>
                <FontAwesomeIcon
                  icon="times"
                  className="close"
                  onClick={this.deactivateEditMode}
                />
              </div>

              <AutosizeInput
                className="name-edit"
                value={stateName}
                onChange={this.onNameChange}
                style={{ fontSize: 24 }}
              />
              <button className="save" onClick={this.onSave}>
                Save Changes
              </button>
            </div>
          )}
          <div className="want-subhead">
            {!completed && (
              <div className="progress-container">
                <Line
                  percent={progress / goal * 100}
                  strokeWidth="5"
                  trailWidth="5"
                  strokeColor="#6fcf97"
                  trailColor="#e0e0e0"
                  strokeLinecap="square"
                  className="progress"
                />
                {!editMode && (
                  <div className="numerical-container">
                    <p className="progression">{progress / 100} /</p>
                    <p className="number">
                      {numeral(goal / 100).format('$0,0')}
                    </p>
                  </div>
                )}
                {editMode && (
                  <div className="numerical-container">
                    <p className="progression">{progress / 100}/</p>
                    <AutosizeInput
                      className="number-edit"
                      style={{ fontSize: 12 }}
                      placeholder={numeral(goal / 100).format('$0,0')}
                      onChange={this.onGoalChange}
                      onKeyPress={this.onSubmitChanges}
                      value={stateGoal}
                    />
                  </div>
                )}
              </div>
            )}
            {completed && (
              <div className="progress-container">
                <Line
                  percent={progress / goal * 100}
                  strokeWidth="5"
                  trailWidth="5"
                  strokeColor="#f2c94c"
                  trailColor="#e0e0e0"
                  strokeLinecap="square"
                  className="progress"
                />
                <p className="number">Complete!</p>
              </div>
            )}
          </div>
        </header>
        <main className="want-body">
          {!editMode && (
            <div className="percent">
              <h3 className="title">Percent</h3>
              <div className="percent-group">
                <p className="number">{percent}</p>
                <span className="symbol">%</span>
              </div>
            </div>
          )}
          {editMode && (
            <div className="percent">
              <h3 className="title">Percent</h3>
              <div className="percent-group">
                <div
                  className="angle angleleft"
                  onClick={this.decrementPercent}
                >
                  <FontAwesomeIcon icon="angle-left" className="icon" />
                </div>
                <p className="number">{statePercent}</p>
                <span className="symbol">%</span>
                <div
                  className="angle angleright"
                  onClick={this.incrementPercent}
                >
                  <FontAwesomeIcon icon="angle-right" className="icon" />
                </div>
              </div>
            </div>
          )}
          {!editMode && (
            <div className="description">
              <h3 className="title">Description</h3>
              {description.length > 0 ? (
                <p className="text">{description}</p>
              ) : (
                <p className="text">
                  You have not given this account a description.
                </p>
              )}
            </div>
          )}
          {editMode && (
            <div className="description">
              <h3 className="title">Description</h3>
              {description.length > 0 ? (
                <textarea
                  className="text-edit"
                  value={description}
                  data-gramm_editor="false"
                />
              ) : (
                <p className="text">
                  You have not given this account a description.
                </p>
              )}
            </div>
          )}
          <div className="shared">
            <h3 className="title">Shared</h3>
            {shared.length === 0 ? (
              <div className="invite-container" onClick={this.showShareModal}>
                <div className="invite">
                  <FontAwesomeIcon icon="plus" />
                </div>
                <p className="subhead">add</p>
              </div>
            ) : (
              <p className="text">You have shared this account with people.</p>
            )}
          </div>
          <div className="gallery">
            <Gallery
              id={_id}
              url={this.props.match.params.id}
              acctype="wants"
            />
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  email: state.auth.email,
  want: state.wants.newWants.find(want => want._id === props.match.params.id)
})

export default connect(mapStateToProps, {
  startSetUser,
  updateWant,
  loadModal
})(WantsPage)
