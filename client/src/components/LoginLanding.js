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
          <div className="test">
            <h1>This is a work in progress</h1>
            <h1>- 10th Aug 2020</h1>
            <h2>Test login:</h2>
            <ul>
              <li>username: <strong>"Alex"</strong></li>
              <li>password: <strong>"test"</strong></li>
            </ul>
            <p>To do list:</p>
            <ul>
              <li>Finish mobile login page</li>
              <li>Complete register function</li>
              <li>Improve transition animations</li>
              <li>Implement D3 charts and dashboard</li>
              <li>Paginate transaction logs</li>
            </ul>
          </div>
          <Login />
          {/* <Register /> */}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(LoginLanding)