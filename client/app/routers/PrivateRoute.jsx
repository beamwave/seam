import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

// import Sidebar from 'react-sidebar'
// import SidebarContent from '../components/SidebarContent.jsx'
import ModalContainer from '../components/ModalContainer.jsx'

import { loadModal } from '../actions/modal'

import {
  WANTS_MODAL,
  NEEDS_MODAL,
  TRANSFER_MODAL,
  DISTRIBUTE_MODAL,
  WIPE_MODAL,
  FLUSH_MODAL,
  BUY_MODAL
} from '../constants/modaltypes'

import { startSetUser, editMode } from '../actions/app'

// const mql = window.matchMedia(`(min-width: 800px)`)

class PrivateRoute extends Component {
  // state = {
  //   mql: mql,
  //   docked: this.props.docked,
  //   sidebarOpen: false
  // }

  listenKeyboard = e => {
    // if ((e.ctrlKey || e.metaKey) && e.which == 69) {
    // if (e.key === 'Meta' && e.key === 'e') {
    // alert('cmd+e pressed!')
    // }

    if (e.ctrlKey && e.which == 69) {
      this.props.editMode()
    }

    if (e.ctrlKey && e.which == 87) {
      this.showWantsModal()
    }

    if (e.ctrlKey && e.which == 78) {
      this.showNeedsModal()
    }

    if (e.ctrlKey && e.which == 84) {
      this.showTransferModal()
    }

    if (e.ctrlKey && e.which == 68) {
      this.showDistributeModal()
    }
  }

  componentWillMount = () => {
    this.props.startSetUser({ email: this.props.email })
    window.addEventListener('keydown', this.listenKeyboard, true)

    // mql.addListener(this.mediaQueryChanged)
    // this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.listenKeyboard, true)

    // this.state.mql.removeListener(this.mediaQueryChanged)
  }

  // mediaQueryChanged = () =>
  //   this.setState({ sidebarDocked: this.state.mql.matches })

  // onSetSidebarOpen = () =>
  //   this.setState({ sidebarOpen: !this.state.sidebarOpen })

  showWantsModal = () => this.props.loadModal(WANTS_MODAL)
  showNeedsModal = () => this.props.loadModal(NEEDS_MODAL)
  showTransferModal = () => this.props.loadModal(TRANSFER_MODAL)
  showDistributeModal = () => this.props.loadModal(DISTRIBUTE_MODAL)
  showWipeModal = () => this.props.loadModal(WIPE_MODAL)
  showFlushModal = () => this.props.loadModal(FLUSH_MODAL)
  showBuyModal = () => this.props.loadModal(BUY_MODAL)

  render = () => {
    const {
      isAuthenticated,
      onSetSidebarOpen,
      component: Component,
      ...rest
    } = this.props

    // const sidebar = <SidebarContent />

    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div>
              {/* <Sidebar
                sidebar={sidebar}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
              > */}
              <Header />
              {/* <Header onSetSidebarOpen={this.onSetSidebarOpen} /> */}
              {/* Get above from props */}
              <Component {...props} />
              <ModalContainer />
              {/* </Sidebar> */}
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
  isAuthenticated: !!state.auth.token,
  email: state.auth.email
})

export default connect(mapStateToProps, { startSetUser, loadModal, editMode })(
  PrivateRoute
)
