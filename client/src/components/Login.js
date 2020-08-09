import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import customerActions from '../actions/customer.actions'

const Login = (props) => {
  const [ username, setUsername ] = useState(null)
  const [ password, setPassword ] = useState(null)
  const dispatch = useDispatch()

  const handleInput = (event, type) => {
    switch (type) {
      case 'u':
        setUsername(event.target.value)
        console.log(username)
        break
      case 'p':
        setPassword(event.target.value)
        console.log(password)
        break
      default: // do nothing
    }
  }

  const loginMethod = () => {
    if (!username || !password) { return }
    const credentials = { username, password }
    // customerServices.login(credentials)
    dispatch(customerActions.loginAction(credentials))
  }

  return (
    <div className="login">
      <input type="text" placeholder="Username" onChange={(event) => handleInput(event, 'u')} />
      <input type="text" placeholder="Password" onChange={(event) => handleInput(event, 'p')} />
      <button className="button-inverse" onClick={() => loginMethod()}>Login</button>
      <div>
        <p>Login loading: {props.loginLoading ? 'true' : 'false'}</p>
        <p>Login success: {props.loginSuccess ? 'true' : 'false'}</p>
        <p>Login failure: {props.loginFailure ? 'true' : 'false'}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginLoading: state.CustomerReducer.userLoginLoading,
  loginSuccess: state.CustomerReducer.userLoginSuccess,
  loginFailure: state.CustomerReducer.userLoginFailure
})

export default connect(mapStateToProps)(Login)