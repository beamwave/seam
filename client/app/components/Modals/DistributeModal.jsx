import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import numeral from 'numeral'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class DistributeModal extends Component {
  state = {
    distribute: ''
  }

  onClose = () => this.props.hideModal()

  onDistributeChange = ({ target }) => {
    const regex = /^\d{1,}(\.\d{0,2})?$/

    if (!target.value || target.value.match(regex)) {
      this.setState(() => ({ distribute: target.value }))
    }
  }

  render = () => {
    const { undistributedCash, wants, needs } = this.props
    const { distribute } = this.state
    return (
      <Modal onClose={this.onClose}>
        <div className="distribute-modal">
          <div className="modal_header">
            <h2 className="title">Undistributed Cash</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <p className="remaining-cash">
            <span>{numeral(undistributedCash / 100).format('$0,0.00')}</span>{' '}
            left to distribute
          </p>
          <form className="distribute-form">
            <div className="input-group center-group">
              <label className="title" htmlFor="amount">
                Distribute
              </label>
              <span className="dollar-symbol">$</span>
              <input
                className="distribute"
                type="text"
                name="amount"
                placeholder={undistributedCash / 100}
                onChange={this.onDistributeChange}
                value={distribute}
              />
            </div>
            <div className="distribute-split-data">
              <div className="input-group">
                <label className="title" htmlFor="to">
                  To
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select className="to select" name="to">
                  <option value="choose" disabled selected hidden>
                    Choose account
                  </option>
                  {wants.map(
                    want =>
                      !want.completed && (
                        <option value={want.name} key={want._id}>
                          {want.name}
                        </option>
                      )
                  )}
                  {needs.map(
                    need =>
                      !need.completed && (
                        <option value={need.name} key={need._id}>
                          {need.name}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="input-group">
                <label className="title" htmlFor="even">
                  Or
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select className="all select" name="even">
                  <option value="evenly" selected disabled hidden>
                    Distribute to many
                  </option>
                  <option value="wants">Evenly across wants</option>
                  <option value="needs">Evenly across needs</option>
                  <option value="even">Evenly across all</option>
                  <option value="percent">Percentage across all</option>
                </select>
              </div>
            </div>

            <div className="distribute-modal_buttons">
              <button className="cancel" type="button" onClick={this.onClose}>
                Cancel
              </button>
              {(+undistributedCash === 0 ||
                +distribute === 0 ||
                +distribute > undistributedCash / 100) && (
                <button className="submit" type="submit" disabled="true">
                  Distribute
                </button>
              )}
              {+distribute > 0 &&
                +distribute <= undistributedCash / 100 && (
                  <button className="submit" type="submit">
                    Distribute
                  </button>
                )}
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

const mapStateToProps = state => ({
  email: state.auth.email,
  undistributedCash: state.app.newUndistributedCash,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds
})

export default connect(mapStateToProps, mapDispatchToProps)(DistributeModal)
