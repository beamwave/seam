import React from 'react'
import { render } from 'react-dom'
import AppRouter from './routers/AppRouters.jsx'

import './styles/styles.sass'

// import '~/node_modules/font-awesome/scss/font-awesome.scss'

render(<AppRouter />, document.getElementById('root'))
