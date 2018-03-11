import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export class LoginPage extends Component {
  state = {}

  render = () => {
    const { startLogin } = this.props
    return (
      <form>
        <label>username</label>
        <input type="text" />
        <label>password</label>
        <input type="password" />
        <Link to="/">Submit</Link>
        <button onClick={startLogin}>Login</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
