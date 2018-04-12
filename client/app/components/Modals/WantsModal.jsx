import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startCreateWant } from '../../actions/wants'

export class WantsModal extends Component {
  state = {
    selectedFile: null
  }

  onClose = () => this.props.hideModal()

  fileSelectedHandler = ({ target }) =>
    this.setState({ selectedFile: target.files[0] })

  onCreateWant = e => {
    e.preventDefault()

    const { name, percent, goal, description } = e.target
    const { email } = this.props
    const selectedFile = this.state.selectedFile

    let formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('email', email)
    formData.append('name', name.value)
    formData.append('percent', percent.value)
    formData.append('goal', goal.value)
    formData.append('description', description.value)

    this.props.createWant(formData)

    this.props.hideModal()
  }

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="wants-modal">
          <div className="wants-modal_header">
            <h2 className="title">New Want</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <p className="remaining-points">
            <span>27</span> points remaining
          </p>
          <form className="wants-form" onSubmit={this.onCreateWant}>
            <div className="input-group">
              <label className="title" htmlFor="name">
                Name
              </label>
              <input type="text" name="name" required />
            </div>

            <div className="wants-numerical-data">
              <div className="input-group">
                <label className="title" htmlFor="percent">
                  Percent
                </label>
                <span className="percent-symbol">%</span>
                <input
                  className="percent"
                  type="number"
                  placeholder="0"
                  name="percent"
                  required
                />
              </div>

              <div className="input-group">
                <label className="title" htmlFor="goal">
                  Goal
                </label>
                <span className="dollar-symbol">$</span>
                <input
                  className="goal"
                  type="text"
                  placeholder="0"
                  name="goal"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="title" htmlFor="description">
                Description
              </label>
              <textarea className="description" name="description" />
            </div>

            <div className="input-group">
              <label className="title" htmlFor="file">
                Upload Image
              </label>
              <input
                className="upload"
                name="file"
                type="file"
                onChange={this.fileSelectedHandler}
                data-cloudinary-field="image_id" // ?
              />
            </div>

            <div className="jpeg-placeholder" />

            <div className="wants-modal_buttons">
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
  email: state.auth.email
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  createWant: details => dispatch(startCreateWant(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(WantsModal)
