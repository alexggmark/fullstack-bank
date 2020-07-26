import React from 'react'
import { connect } from 'react-redux'
import LoginLanding from './LoginLanding'
import Loggedin from './Loggedin'

const App = (props) => {
  return (
    <div className="app">
      {!props.loginSuccess ? <LoginLanding /> : <Loggedin /> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginSuccess: state.CustomerReducer.userLoginSuccess,
})

export default connect(mapStateToProps)(App)