import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import customerActions from '../actions/customer.actions'
import LoginLanding from './LoginLanding'
import Loggedin from './Loggedin'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.loginSuccess) { return }
    console.log('About to run populateUserData')
    dispatch(customerActions.populateUserData())
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