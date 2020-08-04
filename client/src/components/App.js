import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LoginLanding from './LoginLanding'
import Loggedin from './Loggedin'
import '../styles/transitions.scss'

const App = (props) => {
  const [ login, setLogin ] = useState(false)

  const loginOut = () => {
    setLogin(!login)
  }

  return (
    <CSSTransition
      // in={!props.loginSuccess}
      in={!login}
      classNames="testclass"
      timeout={2500}
    >
      <div className="app">
        <button className="test-button" onClick={() => loginOut()}>Test login</button>
        <CSSTransition
          in={!login}
          // in={!props.loginSuccess}
          appear={true}
          classNames="loginlanding"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <LoginLanding />
        </CSSTransition>
        <CSSTransition
          in={login}
          // in={props.loginSuccess}
          timeout={1500}
          classNames="loggedin"
          mountOnEnter
          unmountOnExit
        >
          <Loggedin />
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  loginSuccess: state.CustomerReducer.userLoginSuccess,
})

export default connect(mapStateToProps)(App)