import React from 'react'
import { ReactComponent as Piggy } from '../assets/money.svg'
import { Link } from 'react-router-dom'
import UserProfileWidget from './UserProfileWidget'
import '../styles/navigation.scss'

const Navigation = () => {
  return (
    <div className="navigation">
      <Piggy className="logo" />
      <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/current">Current Account</Link></li>
          <li><Link to="/savings">Savings Account</Link></li>
          <li><Link to="/transfer">Transfer Money</Link></li>
          <li><Link to="/logs">Transfer Logs</Link></li>

      </ul>
      <UserProfileWidget />
    </div>
  )
}

export default Navigation