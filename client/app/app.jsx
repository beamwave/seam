import React from 'react'
import { render } from 'react-dom'
import AppRouter from './routers/AppRouters.jsx'
import fontawesome from '@fortawesome/fontawesome'
import {
  faTimes,
  faBars,
  faSearch,
  faBell,
  faCaretDown,
  faArrowLeft,
  faPlus,
  faDollarSign,
  faShoppingCart,
  faSlidersH
} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(
  faTimes,
  faBars,
  faSearch,
  faBell,
  faCaretDown,
  faArrowLeft,
  faPlus,
  faDollarSign,
  faShoppingCart,
  faSlidersH
)

import './styles/styles.sass'

render(<AppRouter />, document.getElementById('root'))
