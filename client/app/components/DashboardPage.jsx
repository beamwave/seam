import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Header from './Header.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { startSetUser } from '../actions/app'

class DashboardPage extends Component {
  state = {
    render: false
  }

  componentDidMount = () => {
    this.props.startSetUser({ email: this.props.email })

    setTimeout(() => {
      this.setState({ render: true })
    }, 0)
  }

  render = () => {
    const { editMode } = this.props

    let renderContainer = false

    if (this.state.render) {
      renderContainer = (
        <div className="dashboard-body">
          {this.props.editMode === true && (
            <div className="edit-title">
              <p className="title">Edit Mode</p>
              <button className="save">Save Changes</button>
            </div>
          )}
          <form
            className="divvy-group"
            style={{ marginTop: editMode === false ? 31 : 0 }}
          >
            <label className="title">Income</label>
            <input
              className="input"
              type="text"
              placeholder="add money to accounts..."
            />
            {this.props.accounts !== undefined ? (
              <button className="button" type="submit" disabled>
                Split
              </button>
            ) : (
              <button className="button" type="submit" disabled>
                Split
              </button>
            )}
          </form>
          {this.props.editMode === false && (
            // normal mode
            <div>
              <div className="header">
                <h2>Wants</h2>
                <p>({this.props.wants.length})</p>
              </div>
              {this.props.wants.length > 0 ? (
                <div className="container">
                  {this.props.wants.map((want, i) => (
                    <Link
                      key={want._id}
                      to={`/wants/${want._id}`}
                      className="card"
                    >
                      <div className="top">
                        <div
                          className="image"
                          id={want.wallpaper}
                          style={{
                            background: `url(${
                              want.wallpaper
                            }) center / cover no-repeat`
                          }}
                        />
                        <div className="percent">
                          <p className="text">{want.percent}</p>
                          <p className="symbol">%</p>
                        </div>
                        <h2 className="name">{want.name}</h2>
                      </div>
                      <div className="meta">
                        <div className="block">
                          <h3>progress</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {want.progress}
                          </p>
                        </div>
                        <div className="block">
                          <h3>goal</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {want.goal}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="container">
                  <p>You have not created any wants.</p>
                </div>
              )}

              <div className="header">
                <h2>Needs</h2>
                <p>({this.props.needs.length})</p>
              </div>
              {this.props.needs.length > 0 ? (
                <div className="container">
                  {this.props.needs.map((need, i) => (
                    <Link
                      key={need._id}
                      to={`/need/${need._id}`}
                      className="card"
                    >
                      <div className="top">
                        <div
                          className="image"
                          id={need.wallpaper}
                          style={{
                            background: `url(${
                              need.wallpaper
                            }) center / cover no-repeat`
                          }}
                        />
                        <div className="percent">
                          <p className="text">{need.percent}</p>
                          <p className="symbol">%</p>
                        </div>
                        <h2 className="name">{need.name}</h2>
                      </div>
                      <div className="meta">
                        <div className="block">
                          <h3>payment</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {need.payment}
                          </p>
                        </div>
                        <div className="block">
                          <h3>method</h3>
                          <p>{need.method}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="container">
                  <p>You have not created any needs.</p>
                </div>
              )}
            </div>
          )}

          {this.props.editMode === true && (
            // edit mode
            <div>
              <div className="header">
                <h2>Wants</h2>
                <p>({this.props.wants.length})</p>
              </div>
              {this.props.wants.length > 0 ? (
                <div className="container">
                  {this.props.wants.map((want, i) => (
                    <div key={want._id} className="card">
                      <div className="top">
                        <div
                          className="image"
                          id={want.wallpaper}
                          style={{
                            background: `url(${
                              want.wallpaper
                            }) center / cover no-repeat`
                          }}
                        />
                        <div className="percent">
                          <FontAwesomeIcon
                            icon="angle-left"
                            className="angleleft"
                          />
                          <p className="text">{want.percent}</p>
                          <p className="symbol">%</p>
                          <FontAwesomeIcon
                            icon="angle-right"
                            className="angleright"
                          />
                        </div>
                        <h2 className="name">{want.name}</h2>
                      </div>
                      <div className="meta">
                        <div className="block">
                          <h3>progress</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {want.progress}
                          </p>
                        </div>
                        <div className="block">
                          <h3>goal</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {want.goal}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="container">
                  <p>You have not created any needs.</p>
                </div>
              )}

              <div className="header">
                <h2>Needs</h2>
                <p>({this.props.needs.length})</p>
              </div>
              {this.props.needs.length > 0 ? (
                <div className="container">
                  {this.props.needs.map((need, i) => (
                    <div key={need._id} className="card">
                      <div className="top">
                        <div
                          className="image"
                          id={need.wallpaper}
                          style={{
                            background: `url(${
                              need.wallpaper
                            }) center / cover no-repeat`
                          }}
                        />
                        <div className="percent">
                          <FontAwesomeIcon
                            icon="angle-left"
                            className="angleleft"
                          />
                          <p className="text">{need.percent}</p>
                          <p className="symbol">%</p>
                          <FontAwesomeIcon
                            icon="angle-right"
                            className="angleright"
                          />
                        </div>
                        <h2 className="name">{need.name}</h2>
                      </div>
                      <div className="meta">
                        <div className="block">
                          <h3>payment</h3>
                          <p>
                            <span className="dollar-symbol">$</span>
                            {need.payment}
                          </p>
                        </div>
                        <div className="block">
                          <h3>method</h3>
                          <p>{need.method}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="container">
                  <p>You have not created any needs.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )
    }
    return renderContainer
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.sidebarOpen,
  editMode: state.app.editMode,
  wants: state.wants,
  needs: state.needs,
  email: state.auth.email
})

export default connect(mapStateToProps, { startSetUser })(DashboardPage)

// class DashboardPage extends Component {
//   state = {
//     render: false
//   }

//   componentDidMount = () => {
//     setTimeout(() => {
//       this.setState({ render: true })
//     }, 0)

//     this.props.startSetUser({ email: this.props.email })
//   }

//   render = () => {
//     const { editMode } = this.props

//     let renderContainer = false

//     if (this.state.render) {
//       renderContainer = (
//         <div className="dashboard-body">
//           {this.props.editMode === true && (
//             <div className="edit-title">
//               <p className="title">Edit Mode</p>
//               <button className="save">Save Changes</button>
//             </div>
//           )}
//           <form
//             className="divvy-group"
//             style={{ marginTop: editMode === false ? 57 : 0 }}
//           >
//             <label className="title">Income</label>
//             <input
//               className="input"
//               type="text"
//               placeholder="add money to accounts..."
//             />
//             {this.props.accounts !== undefined ? (
//               <button className="button" type="submit" disabled>
//                 Split
//               </button>
//             ) : (
//               <button className="button" type="submit" disabled>
//                 Split
//               </button>
//             )}
//           </form>
//           {this.props.wants.length > 0 &&
//             this.props.editMode === false && (
//               <div>
//                 <div className="header">
//                   <h2>Wants</h2>
//                   <p>({this.props.wants.length})</p>
//                 </div>
//                 <div className="wants-group">
//                   {this.props.wants.map((want, i) => (
//                     <Link
//                       key={want._id}
//                       to={`/wants/${want._id}`}
//                       className="want-card"
//                     >
//                       <div className="want-image">
//                         <div
//                           className="container"
//                           id={want.wallpaper}
//                           style={{
//                             background: `url(${
//                               want.wallpaper
//                             }) center / cover no-repeat`
//                           }}
//                         />
//                         <div className="percent">
//                           <p className="text">{want.percent}</p>
//                           <p className="symbol">%</p>
//                         </div>
//                         <h2 className="name">{want.name}</h2>
//                       </div>
//                       <div className="want-meta">
//                         <div className="progress">
//                           <h3>progress</h3>
//                           <p>
//                             <span className="dollar-symbol">$</span>
//                             {want.progress}
//                           </p>
//                         </div>
//                         <div className="goal">
//                           <h3>goal</h3>
//                           <p>
//                             <span className="dollar-symbol">$</span>
//                             {want.goal}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//           {this.props.wants.length > 0 &&
//             this.props.editMode === true && (
//               <div>
//                 <div className="header">
//                   <h2>Wants</h2>
//                   <p>({this.props.wants.length})</p>
//                 </div>
//                 <div className="wants-group">
//                   {this.props.wants.map((want, i) => (
//                     <div key={want._id} className="want-card">
//                       <div className="want-image">
//                         <div
//                           className="container"
//                           id={want.wallpaper}
//                           style={{
//                             background: `url(${
//                               want.wallpaper
//                             }) center / cover no-repeat`
//                           }}
//                         />
//                         <div className="percent">
//                           <FontAwesomeIcon
//                             icon="angle-left"
//                             className="angleleft"
//                           />
//                           <p className="text">{want.percent}</p>
//                           <p className="symbol">%</p>
//                           <FontAwesomeIcon
//                             icon="angle-right"
//                             className="angleright"
//                           />
//                         </div>
//                         <h2 className="name">{want.name}</h2>
//                       </div>
//                       <div className="want-meta">
//                         <div className="progress">
//                           <h3>progress</h3>
//                           <p>
//                             <span className="dollar-symbol">$</span>
//                             {want.progress}
//                           </p>
//                         </div>
//                         <div className="goal">
//                           <h3>goal</h3>
//                           <p>
//                             <span className="dollar-symbol">$</span>
//                             {want.goal}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           {this.props.wants.length === 0 &&
//             this.props.editMode === false && (
//               <div>
//                 <div className="header">
//                   <h2>Wants</h2>
//                   <p>(0)</p>
//                 </div>
//                 <p>You have not created any wants.</p>
//               </div>
//             )}
//           {this.props.needs !== undefined ? (
//             this.props.needs.map(need => (
//               <div>
//                 <div className="header">
//                   <h2>Needs</h2>
//                   <p>(0)</p>
//                 </div>
//                 <h2>need.name</h2>
//                 <p>need.percent</p>
//                 <p>need.total</p>
//               </div>
//             ))
//           ) : (
//             <div>
//               <div className="header">
//                 <h2>Needs</h2>
//                 <p>(0)</p>
//               </div>
//               <p>You have no accounts</p>
//             </div>
//           )}
//         </div>
//       )
//     }
//     return renderContainer
//   }
// }

// const mapStateToProps = state => ({
//   sidebarOpen: state.sidebarOpen,
//   editMode: state.app.editMode,
//   wants: state.wants,
//   needs: state.needs,
//   email: state.auth.email
// })

// export default connect(mapStateToProps, { startSetUser })(DashboardPage)
