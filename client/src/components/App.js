import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import LoginLanding from './LoginLanding'
import Loggedin from './Loggedin'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.loginSuccess) { return }
    console.log('Running')
  }, [])

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