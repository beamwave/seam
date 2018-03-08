import React from 'react'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { faUser, faCoffee } from '@fortawesome/fontawesome-free-solid'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook'

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faCoffee} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/stuff">Stuff</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
