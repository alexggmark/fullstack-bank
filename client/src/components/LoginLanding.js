import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'
import '../styles/loginlanding.scss'
import { ReactComponent as Piggy } from '../assets/money.svg'

const LoginLanding = () => {
  return (
    <div className="loginlanding">
      <div className="loginlanding__container">
        <div className="loginlanding__splash">
          <Piggy className="piggu" />
          <h1 className="logo">Alex Bank</h1>
        </div>
        <div className="loginlanding__content">
          <Login />
          <Register />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(LoginLanding)