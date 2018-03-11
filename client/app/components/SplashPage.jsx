import React from 'react'
import { Link } from 'react-router-dom'

export const SplashPage = () => (
  <div>
    <header>
      <div>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
      </div>
    </header>
    <main>
      <h1>Project Phantom</h1>
    </main>
  </div>
)

export default SplashPage
