import React from 'react'
import { Link } from 'react-router-dom'

export const SplashPage = () => (
  <div>
    <header>
      <div>
        <Link to="#">Pricing</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </header>
    <main>
      <section>
        <p>Take Control of Your Money</p>
        <p>Remove the guesswork from saving financial planning.</p>
        <Link to="/signup">Try for Free</Link>
      </section>
      <section>
        <h2>Proactively manage income and spending</h2>
        <ul>
          <li>Create accounts that define where your money goes</li>
          <li>assign accounts to a liercentage of your income</li>
          <li>seperate income into accounts based on your percentage</li>
        </ul>
      </section>
      <section>
        <h2>Budget with friends and family</h2>
        <p>Create shared accounts with others and budget together</p>
      </section>
    </main>
    <footer>
      <div>
        <ul>
          <li>About</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div>
        {/* <Link to="https://www.facebook.com">Facebook</Link> */}
        {/* <Link to="https://www.twitter.com">Twitter</Link> */}
      </div>
    </footer>
  </div>
)

export default SplashPage
