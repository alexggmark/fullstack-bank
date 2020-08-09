import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import customerActions from '../actions/customer.actions'
import LoaderComponent from './LoaderComponent'
import '../styles/transitions.scss'

const LoginFailure = () => {
  return <div className="error-box">Incorrect login!</div>
}

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
    dispatch(customerActions.loginAction(credentials))
  }

  return (
    <div className="login">
      <LoaderComponent mini login loading={props.loginLoading}>
        <input type="text" placeholder="Username" onChange={(event) => handleInput(event, 'u')} />
        <input type="text" placeholder="Password" onChange={(event) => handleInput(event, 'p')} />
        <button className="button-inverse" onClick={() => loginMethod()}>Login</button>
      </LoaderComponent>
      <CSSTransition
        in={props.loginFailure}
        classNames="small"
        timeout={100}
        mountOnEnter
        unmountOnExit
      >
        <LoginFailure />
      </CSSTransition>
      <Link to="/register" className="button-form">Go to Register</Link>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginLoading: state.CustomerReducer.userLoginLoading,
  loginSuccess: state.CustomerReducer.userLoginSuccess,
  loginFailure: state.CustomerReducer.userLoginFailure
})

export default connect(mapStateToProps)(Login)