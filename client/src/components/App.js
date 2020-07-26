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
        classNames="loginlanding"
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <LoginLanding />
      </CSSTransition>
      <CSSTransition
        in={props.loginSuccess}
        timeout={1000}
        classNames="loggedin"
        mountOnEnter
        unmountOnExit
      >
        <Loggedin />
      </CSSTransition>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginSuccess: state.CustomerReducer.userLoginSuccess,
})

export default connect(mapStateToProps)(App)