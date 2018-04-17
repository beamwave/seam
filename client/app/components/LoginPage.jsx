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
          email: 'email field cannot be blank',
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
          email: 'please enter a valid email',
          password: prevState.errors.password
        }
      }))
    }

    if (this.state.password.length === 0) {
      console.log('set blank password')
      this.setState(prevState => ({
        errors: {
          email: prevState.errors.email,
          password: 'password field cannot be blank'
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
      <div className="login-page">
        <Link to="/" className="seam">
          Seam
        </Link>
        <form
          className="auth-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          {errors.global && <p className="errors-global">{errors.global}</p>}
          <h2 className="header">Login</h2>
          <div className="input-group">
            <label className="title">email</label>
            <input
              type="email"
              name="email"
              style={{
                border: !!errors.email ? '2px solid #e87c7c' : 'none'
              }}
            />
            {errors.email && <p className="inline-errors">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label className="title">password</label>
            <input
              type="password"
              name="password"
              style={{
                border: !!errors.password ? '2px solid #e87c7c' : 'none'
              }}
            />
            {errors.password && (
              <p className="inline-errors">{errors.password}</p>
            )}
          </div>
          <div className="input-group">
            <button type="submit" className="submit">
              Login
            </button>
          </div>
          <div className="other-page">
            <p className="text">Don't have an account?</p>
            <Link to="/signup" className="link">
              &nbsp;Signup
            </Link>
          </div>
        </form>
        <div className="overlay" />
        <div className="bg" />
      </div>
    )
  }
}

export default connect(undefined, { startLogin })(LoginPage)
