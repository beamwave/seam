import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSignup } from '../actions/auth'

export class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: ''
    }
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
    this.props
      .startSignup(data)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render = () => {
    const { errors } = this.state
    return (
      <div>
        <Link to="/">Seam</Link>
        <h2>Sign Up</h2>
        <form onChange={this.onFieldChange} onSubmit={this.onSubmit}>
          <label>email</label>
          <input type="email" name="email" />
          <label>password</label>
          <input type="password" name="password" />
          <button>Signup</button>
        </form>
        {errors.global && <p>{errors.global}</p>}
        <p>
          Already have an account?<Link to="/login"> Login</Link>
        </p>
      </div>
    )
  }
}

export default connect(undefined, { startSignup })(SignupPage)
