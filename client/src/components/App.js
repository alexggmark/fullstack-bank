import React from 'react'
import { connect } from 'react-redux'
import LoginLanding from './LoginLanding'
import LoggedinLanding from './LoggedinLanding'

const App = (props) => {
  return (
    <div className="app">
      {!props.loginSuccess ? <LoginLanding /> : <LoggedinLanding /> }
    </div>
  )
}

const mapStateToProps = ({ CustomerReducer }) => ({
  loginSuccess: CustomerReducer.userLoginSuccess,
})

export default connect(mapStateToProps)(App)