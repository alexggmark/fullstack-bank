import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LoginLanding from './LoginLanding'
import Loggedin from './Loggedin'
import '../styles/transitions.scss'

const App = (props) => {
  return (
    <div className="app">
      <CSSTransition
        in={!props.loginSuccess}
        timeout={2000}
        classNames="loginlanding"
        mountOnEnter
        unmountOnExit
      >
        <LoginLanding />
      </CSSTransition>
      <CSSTransition
        in={props.loginSuccess}
        timeout={2000}
        classNames="loginlanding"
        mountOnEnter
        unmountOnExit
      >
        <Loggedin />
      </CSSTransition>
      {/* {!props.loginSuccess ? <LoginLanding /> : <Loggedin /> } */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginSuccess: state.CustomerReducer.userLoginSuccess,
})

export default connect(mapStateToProps)(App)