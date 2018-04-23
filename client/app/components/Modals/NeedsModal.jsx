import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startCreateNeed } from '../../actions/needs'

export class NeedsModal extends Component {
  state = {
    selectedFile: null
  }

  onClose = () => this.props.hideModal()

  fileSelectedHandler = ({ target }) =>
    this.setState({ selectedFile: target.files[0] })

  onCreateNeed = e => {
    e.preventDefault()

    const { name, percent, method, payment, description } = e.target
    const { email } = this.props
    const selectedFile = this.state.selectedFile

    let formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('email', email)
    formData.append('name', name.value)
    formData.append('percent', percent.value)
    formData.append('method', method.value)
    formData.append('payment', payment.value)
    formData.append('description', description.value)

    this.props.createNeed(formData)

    this.props.hideModal()
  }

  render = () => {
    const { newPoints } = this.props
    return (
      <Modal onClose={this.onClose}>
        <div className="needs-modal">
          <div className="modal_header">
            <h2 className="title">New Need</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <p className="remaining-points">
            <span>{newPoints}</span> points remaining
          </p>
          <form
            className="needs-form"
            autoComplete="off"
            onSubmit={this.onCreateNeed}
          >
            <div className="input-group">
              <label className="title" htmlFor="name">
                Name
              </label>
              <input type="text" name="name" autoFocus />
            </div>

            <div className="needs-numerical-data">
              <div className="input-group">
                <label className="title" htmlFor="percent">
                  Percent
                </label>
                <span className="percent-symbol">%</span>
                <input
                  className="percent"
                  name="percent"
                  type="number"
                  placeholder="0"
                />
              </div>

              <div className="input-group">
                <label className="title" htmlFor="method">
                  Method
                </label>
                <select
                  className="method"
                  type="text"
                  name="method"
                  placeholder="0"
                >
                  <option value="recurrent">Recurrent</option>
                  <option value="growth">Growth</option>
                </select>
              </div>
            </div>

            {/* <label htmlFor="date">Date</label> */}
            {/* <select name="date">
            <option value="" />
          </select> */}

            <div className="input-group">
              <label className="title" htmlFor="payment">
                Payment
              </label>
              <span className="dollar-symbol">$</span>
              <input className="payment" type="text" name="payment" />
            </div>

            <div className="input-group">
              <label className="title" htmlFor="description">
                Description
              </label>
              <textarea
                className="description"
                name="description"
                data-gramm_editor="false"
              />
            </div>

            <div className="input-group">
              <label className="title" htmlFor="image">
                Upload Image
              </label>
              <input
                className="upload"
                type="file"
                placeholder="new image"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={this.fileSelectedHandler}
              />
            </div>

            <div className="jpeg-placeholder" />

            <div className="needs-modal_buttons">
              <button className="cancel" onClick={this.onClose}>
                Cancel
              </button>
              <button className="submit" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  newPoints: state.app.newPoints
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  createNeed: details => dispatch(startCreateNeed(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(NeedsModal)
