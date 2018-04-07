import React from 'react'
import { connect } from 'react-redux'

// import all modal components
import WantsModal from './Modals/WantsModal.jsx'
import NeedsModal from './Modals/NeedsModal.jsx'
import TransferModal from './Modals/TransferModal.jsx'
import DistributeModal from './Modals/DistributeModal.jsx'
import WipeModal from './Modals/WipeModal.jsx'
import FlushModal from './Modals/FlushModal.jsx'
import BuyModal from './Modals/BuyModal.jsx'

// import modal type constants
import {
  WANTS_MODAL,
  NEEDS_MODAL,
  TRANSFER_MODAL,
  DISTRIBUTE_MODAL,
  WIPE_MODAL,
  FLUSH_MODAL,
  BUY_MODAL
} from '../constants/modaltypes'

// modal directory based on props.modalType
const MODAL_COMPONENTS = {
  WANTS_MODAL: WantsModal,
  NEEDS_MODAL: NeedsModal,
  TRANSFER_MODAL: TransferModal,
  DISTRIBUTE_MODAL: DistributeModal,
  WIPE_MODAL: WipeModal,
  FLUSH_MODAL: FlushModal,
  BUY_MODAL: BuyModal
}

const ModalContainer = props => {
  // if no modal set in store, do not render one
  if (!props.modalType) {
    return null
  }

  // object lookup
  const SpecificModal = MODAL_COMPONENTS[props.modalType]

  return <SpecificModal />
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType
})

export default connect(mapStateToProps)(ModalContainer)
