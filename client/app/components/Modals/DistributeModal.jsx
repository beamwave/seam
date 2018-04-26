import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import numeral from 'numeral'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startDistribute } from '../../actions/app'

export class DistributeModal extends Component {
  state = {
    amount: '',
    one: true,
    many: false
  }

  onClose = () => this.props.hideModal()

  onDistributeChange = ({ target }) => {
    const regex = /^\d{1,}(\.\d{0,2})?$/

    if (!target.value || target.value.match(regex)) {
      this.setState(() => ({ amount: target.value }))
    }
  }

  onOneChange = ({ target }) =>
    this.setState({ one: target.value, many: false })

  onManyChange = ({ target }) =>
    this.setState({ one: false, many: target.value })

  onDistribute = e => {
    e.preventDefault()
    const { email, startDistribute } = this.props
    const { amount, one, many } = this.state

    const data = {
      email,
      amount: amount * 100,
      one,
      many
    }

    startDistribute(data).then(() => this.onClose())
  }

  render = () => {
    const { undistributedCash, wants, needs } = this.props
    const { amount } = this.state
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
          <form className="distribute-form" onSubmit={this.onDistribute}>
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
                value={amount}
              />
            </div>
            <div className="distribute-split-data">
              <div className="input-group">
                <label className="title" htmlFor="to">
                  To
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select
                  className="to select"
                  name="to"
                  onChange={this.onOneChange}
                >
                  {wants.filter(want => !want.completed).length === 0 &&
                  needs.length === 0 ? (
                    <option value="choose" disabled selected="true" hidden>
                      None available
                    </option>
                  ) : (
                    <option value="choose" disabled selected="true" hidden>
                      Choose account
                    </option>
                  )}
                  {wants.map(
                    want =>
                      !want.completed && (
                        <option value={want._id} key={want._id}>
                          {want.name}
                        </option>
                      )
                  )}
                  {needs.map(need => (
                    <option value={need._id} key={need._id}>
                      {need.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label className="title" htmlFor="even">
                  Or
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select
                  className="all select"
                  name="even"
                  onChange={this.onManyChange}
                >
                  <option value="evenly" selected disabled hidden>
                    Distribute to many
                  </option>
                  <option value="wants">Evenly across wants</option>
                  <option value="needs">Evenly across needs</option>
                  <option value="evenly">Evenly across all</option>
                  <option value="percentage">Percentage across all</option>
                </select>
              </div>
            </div>

            <div className="distribute-modal_buttons">
              <button className="cancel" type="button" onClick={this.onClose}>
                Cancel
              </button>
              {(+undistributedCash === 0 ||
                +amount === 0 ||
                +amount > undistributedCash / 100) && (
                <button className="submit" type="submit" disabled="true">
                  Distribute
                </button>
              )}
              {+amount > 0 &&
                +amount <= undistributedCash / 100 && (
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
  hideModal: () => dispatch(hideModal()),
  startDistribute: data => dispatch(startDistribute(data))
})

const mapStateToProps = state => ({
  email: state.auth.email,
  undistributedCash: state.app.newUndistributedCash,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds
})

export default connect(mapStateToProps, mapDispatchToProps)(DistributeModal)
