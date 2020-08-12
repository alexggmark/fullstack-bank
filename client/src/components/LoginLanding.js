import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import '../styles/loginlanding.scss'
import { ReactComponent as Piggy } from '../assets/money.svg'

const LoginLanding = () => {
  return (
    <BrowserRouter>
      <div className="loginlanding">
        <div className="loginlanding__container">
          <div className="loginlanding__splash">
            <Piggy className="piggu" />
            <h1 className="logo">Alex Bank</h1>
          </div>
          <div className="loginlanding__content">
            <div className="test">
              <h1>This is a work in progress</h1>
              <h1>- 13th Aug 2020</h1>
              <h2>Test login:</h2>
              <ul>
                <li>username: <strong>"Alex"</strong></li>
                <li>password: <strong>"test"</strong></li>
              </ul>
              <p>To do list:</p>
              <ul>
                <li className="strike">Paginate transaction logs</li>
                <li className="strike">Automate account--store process</li>
                <li>Improve transfer money button action</li>
                <li>Finish mobile login page</li>
                <li>Complete register function</li>
                <li>Improve transition animations</li>
                <li>Implement D3 charts and dashboard</li>
              </ul>
            </div>
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