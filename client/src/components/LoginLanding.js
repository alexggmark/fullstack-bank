import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import '../styles/loginlanding.scss'
import Character1 from '../assets/character1min.png'

const GuestBox = () => {
  const [close, setClose] = useState(false)

  const closeButton = () => {
    setClose(true)
  }

  return (
    <>
      {close ? '' : <div className="guest-box">
        <h3>Test login:</h3>
        <button onClick={closeButton}>X</button>
        <p>username: <strong>Guest</strong></p>
        <p>password: <strong>test</strong></p>
      </div>}
    </>
  )
}

const LoginLanding = () => {
  return (
    <BrowserRouter>
      <div className="loginlanding">
        <div className="loginlanding__container">
          <div className="loginlanding__splash">
          <GuestBox />
            {/* <Piggy className="piggu" /> */}
            <div className="loginlanding__character-container">
              <img src={Character1} alt="Welcome character" />
            </div>
            <h1 className="logo">BankSim</h1>
            {/* <ul className="loginlanding__ul">
              <li>✅ All accounts start with £10,000</li>
              <li>✅ Move money between Store, Savings and Current accounts</li>
              <li>✅ D3Charts track live updates to accounts</li>
              <li>✅ All transactions tracked in log pages</li>
            </ul> */}
          </div>
          <div className="loginlanding__content">
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(LoginLanding)