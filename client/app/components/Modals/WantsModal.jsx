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

    // this.props.createWant({
    //   email: this.props.email,
    //   name: name.value,
    //   percent: percent.value,
    //   goal: goal.value,
    //   description: description.value
    // })
    this.props.hideModal()
  }

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="wants-modal_header">
          <h2>New Want</h2>
          <FontAwesomeIcon icon="times" onClick={this.onClose} />
          <p>
            <span>27</span> points remaining
          </p>
        </div>
        <form onSubmit={this.onCreateWant}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />

          <label htmlFor="percent">Percent</label>
          <span>%</span>
          <input type="number" placeholder="0" name="percent" required />

          <label htmlFor="goal">Goal</label>
          <span>$</span>
          <input type="text" placeholder="0" name="goal" required />

          <label htmlFor="description">Description</label>
          <textarea name="description" />

          <label htmlFor="file">Upload Image</label>
          <input
            className="file-upload"
            name="file"
            type="file"
            onChange={this.fileSelectedHandler}
            data-cloudinary-field="image_id" // ?
          />

          <div className="jpeg-placeholder" />

          <div className="wants-modal_buttons">
            <button>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
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
