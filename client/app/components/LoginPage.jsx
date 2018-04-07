import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export class LoginPage extends Component {
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

  onSubmit = e => {
    e.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    // const emailRegex = //

    if (this.state.email.length === 0) {
      this.setState(prevState => ({
        errors: {
          email: 'email field must not be blank',
          password: prevState.errors.password
        }
      }))
    } else if (this.state.email.length > 0) {
      this.setState(prevState => ({
        errors: {
          email: '',
          password: prevState.errors.password
        }
      }))
    } else if (!this.state.email.match(emailRegex)) {
      this.setState(prevState => ({
        errors: {
          email: 'must enter valid email',
          password: prevState.errors.password
        }
      }))
    }

    if (this.state.password.length === 0) {
      console.log('set blank password')
      this.setState(prevState => ({
        errors: {
          email: prevState.errors.email,
          password: 'password field must not be blank'
        }
      }))
    } else if (this.state.password.length > 0) {
      this.setState(prevState => ({
        errors: {
          email: prevState.errors.email,
          password: ''
        }
      }))
    }

    if (this.state.email.length > 0 && this.state.password.length > 0) {
      this.props
        .startLogin(data)
        .then(() => {
          this.props.history.push('/dashboard')
        })
        .catch(err => this.setState({ errors: err.response.data.errors }))
    }
  }

  render = () => {
    const { errors } = this.state
    return (
      <div>
        <Link to="/">Seam</Link>
        <h2>Login</h2>
        <form onChange={this.onFieldChange} onSubmit={this.onSubmit}>
          <label>email</label>
          <input type="email" name="email" />
          {errors.email && <p>{errors.email}</p>}
          <label>password</label>
          <input type="password" name="password" />
          {errors.password && <p>{errors.password}</p>}
          <button>Login</button>
        </form>
        {errors.global && <p>{errors.global}</p>}
        <p>
          Don't have an account?<Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    )
  }
}

export default connect(undefined, { startLogin })(LoginPage)
