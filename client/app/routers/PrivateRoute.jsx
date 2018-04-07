import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

// gets isAuthenticated from mapStateToProps
// gets component from actual component in ./AppRouters.jsx
// gets ...rest (route information) from Router in ./AppRouters.jsx
const PrivateRoute = ({
  isAuthenticated,
  onSetSidebarOpen,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <div>
            <Header onSetSidebarOpen={onSetSidebarOpen} />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(PrivateRoute)
