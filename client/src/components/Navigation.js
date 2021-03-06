import React, { createRef } from 'react'
import { ReactComponent as Piggy } from '../assets/money.svg'
import { ReactComponent as Cross } from '../assets/cross.svg'
import { Link } from 'react-router-dom'
import UserProfileWidget from './UserProfileWidget'
import '../styles/navigation.scss'

const Navigation = () => {
  const navMenu = createRef()

  const activeNavMobile = () => {
    if (navMenu.current.classList.contains('active')) {
      navMenu.current.classList.remove('active')
      return
    }
    navMenu.current.classList.add('active')
    return
  }

  return (
    <div className="navigation" ref={navMenu}>
      <div className="navigation__inner">
        <Piggy className="logo" />
        <ul>
            <li><Link to="/" onClick={activeNavMobile}>Dashboard</Link></li>
            <li><Link to="/current" onClick={activeNavMobile}>Current Account</Link></li>
            <li><Link to="/savings" onClick={activeNavMobile}>Savings Account</Link></li>
            <li><Link to="/transfer" onClick={activeNavMobile}>Transfer Money</Link></li>
        </ul>
        <div className="navigation__button" onClick={activeNavMobile}>
          <Cross />
        </div>
        <UserProfileWidget />
      </div>
    </div>
  )
}

export default Navigation