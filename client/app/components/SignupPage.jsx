import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSignup } from '../actions/auth'

export class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    errors: ''
  }

  onFieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  // startSignup will also have dispatch with it
  onSubmit = e => {
    e.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    // passed down from connect
    this.props.startSignup(data).then(() => {
      this.props.history.push('/dashboard')
    })
  }

  render = () => {
    return (
      <form onChange={this.onFieldChange} onSubmit={this.onSubmit}>
        <label>email</label>
        <input type="email" name="email" />
        <label>password</label>
        <input type="password" name="password" />
        <Link to="/">Submit</Link>
        <button>Signup</button>
        {this.props.error ? <p>{this.props.error}</p> : null}
      </form>
    )
  }
}

export default connect(undefined, { startSignup })(SignupPage)
