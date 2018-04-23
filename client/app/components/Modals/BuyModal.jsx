import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import CheckoutForm from '../CheckoutForm.jsx'
import { Elements } from 'react-stripe-elements'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class BuyModal extends Component {
  state = {
    qty: '',
    name: '',
    card: '',
    exp: '',
    cvc: '',
    country: 'US',
    zip: ''
  }

  onBuyChange = ({ target }) => this.setState({ qty: target.value })

  onFieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  onClose = () => this.props.hideModal()

  onSubmitPayment = () => {
    const { email } = this.props
    const { qty, name, card, exp, cvc, country, zip } = this.state
    // const price = +qty * 99

    const data = {
      email,
      name,
      qty
    }
  }

  render = () => {
    const { wants, needs } = this.props

    return (
      <Modal onClose={this.onClose}>
        <div className="buy-modal">
          <div className="modal_header">
            <h2 className="title">Add accounts</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <div>
            {wants.length + needs.length < 4 ? (
              <p className="remaining-accounts">
                You can create {4 - (wants.length + needs.length)} more free
                accounts
              </p>
            ) : (
              <p className="remaining-accounts">
                You have {wants.length + needs.length} total accounts
              </p>
            )}
          </div>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </Modal>
    )
  }
}
//   render = () => {
//     const { wants, needs } = this.props
//     const { qty, name, card, exp, cvc, country, zip } = this.state

//     return (
//       <Modal onClose={this.onClose}>
//         <div className="buy-modal">
//           <div className="modal_header">
//             <h2 className="title">Add accounts</h2>
//             <FontAwesomeIcon
//               icon="times"
//               className="close"
//               onClick={this.onClose}
//             />
//           </div>
//           <div>
//             {wants.length + needs.length < 4 ? (
//               <p className="remaining-accounts">
//                 You can create {4 - (wants.length + needs.length)} more free
//                 accounts
//               </p>
//             ) : (
//               <p className="remaining-accounts">
//                 You have {wants.length + needs.length} total accounts
//               </p>
//             )}
//           </div>
//           <form
//             className="buy-form"
//             autoComplete="off"
//             onSubmit={this.onSubmitPayment}
//           >
//             <div className="split-card-data">
//               <div className="input-group">
//                 <label className="title" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={name}
//                   onChange={this.onFieldChange}
//                 />
//               </div>
//               <div className="input-group">
//                 <label className="title" htmlFor="number">
//                   Buying
//                 </label>
//                 <input
//                   type="text"
//                   name="number"
//                   value={qty}
//                   onChange={this.onBuyChange}
//                   placeholder="number of accounts?"
//                 />
//               </div>
//             </div>
//             <div className="input-group">
//               <label className="title" htmlFor="card">
//                 Card Number
//               </label>
//               <input
//                 type="text"
//                 name="card"
//                 value={card}
//                 onChange={this.onFieldChange}
//               />
//             </div>
//             <div className="split-card-data">
//               <div className="input-group">
//                 <label className="title" htmlFor="exp">
//                   Exp
//                 </label>
//                 <input
//                   type="number"
//                   name="exp"
//                   value={exp}
//                   onChange={this.onFieldChange}
//                 />
//               </div>
//               <div className="input-group">
//                 <label className="title" htmlFor="cvc">
//                   CVC
//                 </label>
//                 <input
//                   type="text"
//                   name="cvc"
//                   value={cvc}
//                   onChange={this.onFieldChange}
//                 />
//               </div>
//             </div>
//             <div className="split-card-data">
//               <div className="input-group">
//                 <label className="title" htmlFor="country">
//                   Country
//                 </label>
//                 <FontAwesomeIcon className="icon" icon="angle-down" />
//                 <select
//                   className="select"
//                   type="text"
//                   name="country"
//                   value={country}
//                   onChange={this.onFieldChange}
//                 >
//                   <option value="US">US</option>
//                   <option value="Europe">Europe</option>
//                   <option value="Brazil">Brazil</option>
//                   <option value="Japan">Japan</option>
//                   <option value="Russia">Russia</option>
//                 </select>
//               </div>
//               <div className="input-group">
//                 <label className="title" htmlFor="zip">
//                   Zip
//                 </label>
//                 <input
//                   type="number"
//                   name="zip"
//                   value={zip}
//                   onChange={this.onFieldChange}
//                 />
//               </div>
//             </div>
//             <p className="annotation">Each additional account is 99¢.</p>
//             <div className="buy-modal_buttons">
//               <button className="cancel" onClick={this.onClose}>
//                 Cancel
//               </button>
//               {(+qty === 0 || +qty > 92) && (
//                 <button className="submit" type="submit" disabled="true">
//                   Purchase
//                 </button>
//               )}
//               {+qty !== 0 &&
//                 +qty < 93 && (
//                   <button className="submit" type="submit">
//                     Purchase for $<span>{(+qty * 99 / 100).toFixed(2)}</span>
//                   </button>
//                 )}
//             </div>
//           </form>
//         </div>
//       </Modal>
//     )
//   }
// }

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

const mapStateToProps = state => ({
  email: state.auth.email,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyModal)
