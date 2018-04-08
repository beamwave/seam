import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startCreateWant } from '../../actions/wants'

export class WantsModal extends Component {
  onClose = () => this.props.hideModal()

  onCreateWant = e => {
    const { name, percent, goal, description } = e.target
    e.preventDefault()
    // console.log('lets begin, here is the form data: ')
    console.log('email: ', this.props.email)
    this.props.createWant({
      email: this.props.email,
      name: name.value,
      percent: percent.value,
      goal: goal.value,
      description: description.value
    })
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

          <label htmlFor="image">Upload Image</label>
          <input type="file" placeholder="new image" />

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
