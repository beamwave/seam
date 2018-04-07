import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

import Sidebar from 'react-sidebar'
import SidebarContent from '../components/SidebarContent.jsx'
import ModalContainer from '../components/ModalContainer.jsx'
import { toggleSidebar } from '../actions/app'

const mql = window.matchMedia(`(min-width: 800px)`)

class PrivateRoute extends Component {
  state = {
    mql: mql,
    docked: this.props.docked,
    sidebarOpen: false
  }

  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  componentWillUnmount = () =>
    this.state.mql.removeListener(this.mediaQueryChanged)

  mediaQueryChanged = () =>
    this.setState({ sidebarDocked: this.state.mql.matches })

  onSetSidebarOpen = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen })

  render = () => {
    const {
      isAuthenticated,
      onSetSidebarOpen,
      component: Component,
      ...rest
    } = this.props

    const sidebar = <SidebarContent />

    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div>
              <Sidebar
                sidebar={sidebar}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
              >
                <Header onSetSidebarOpen={this.onSetSidebarOpen} />
                <Component {...props} />
              </Sidebar>
              <ModalContainer />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  }
}

// gets isAuthenticated from mapStateToProps
// gets component from actual component in ./AppRouters.jsx
// gets ...rest (route information) from Router in ./AppRouters.jsx
// const PrivateRoute = ({
//   isAuthenticated,
//   onSetSidebarOpen,
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       component={props =>
//         isAuthenticated ? (
//           <div>
//             <Header onSetSidebarOpen={onSetSidebarOpen} />
//             <Component {...props} />
//           </div>
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   )
// }

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(PrivateRoute)
