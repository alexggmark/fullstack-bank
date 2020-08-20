import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import '../styles/loginlanding.scss'
import { ReactComponent as Piggy } from '../assets/money.svg'
import Character1 from '../assets/character1min.png'

const LoginLanding = () => {
  return (
    <BrowserRouter>
      <div className="loginlanding">
        <div className="loginlanding__container">
          <div className="loginlanding__splash">
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
            {/* <div className="test">
              <h1>This is a work in progress</h1>
              <h1>- 20th Aug 2020</h1>
              <h2>Test login:</h2>
              <ul>
                <li>username: <strong>"Alex"</strong></li>
                <li>password: <strong>"test"</strong></li>
              </ul>
              <p>To do list:</p>
              <ul>
                <li className="strike">Paginate transaction logs</li>
                <li className="strike">Automate account--store process</li>
                <li className="strike">Improve transfer money button action</li>
                <li className="strike">Improve transition animations</li>
                <li className="strike">Implement D3 charts and dashboard</li>
                <li>Finish mobile login page</li>
                <li>Complete register animation</li>
              </ul>
            </div> */}
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