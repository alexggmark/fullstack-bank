import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import customerActions from '../actions/customer.actions'
import LoaderComponent from './LoaderComponent'

const RegisterFailure = () => {
  return <div className="error-box">Registration failed!</div>
}

const Register = (props) => {
  const [ firstname, setFirstname ] = useState(null)
  const [ lastname, setLastname ] = useState(null)
  const [ username, setUsername ] = useState(null)
  const [ password, setPassword ] = useState(null)

  const dispatch = useDispatch()

  const handleInput = (event, type) => {
    switch (type) {
      case 'f':
        setFirstname(event.target.value)
        break
      case 'l':
        setLastname(event.target.value)
        break
      case 'u':
        setUsername(event.target.value)
        break
      case 'p':
        setPassword(event.target.value)
        break
        default: // do nothing
    }
  }

  const registerMethod = () => {
    if (!username || !password || !firstname || !lastname) { return }
    const credentials = { username, password, firstname, lastname }
    dispatch(customerActions.registerAction(credentials))
  }

  return (
    <div className="register">
      <LoaderComponent login loading={props.registerLoading}>
        <input type="text" placeholder="First Name" onChange={(event) => handleInput(event, 'f')} />
        <input type="text" placeholder="Last Name" onChange={(event) => handleInput(event, 'l')} />
        <input type="text" placeholder="Username" onChange={(event) => handleInput(event, 'u')} />
        <input type="text" placeholder="Password" onChange={(event) => handleInput(event, 'p')} />
        <button className="button-black" onClick={() => registerMethod()}>Register</button>
        <CSSTransition
          in={props.registerFailure}
          classNames="small"
          timeout={100}
          mountOnEnter
          unmountOnExit
        >
          <RegisterFailure />
        </CSSTransition>
        <Link to="/" className="button-form">Go to Login</Link>
      </LoaderComponent>
    </div>
  )
}

const mapStateToProps = (state) => ({
  registerLoading: state.CustomerReducer.registerLoading,
  registerSuccess: state.CustomerReducer.registerSuccess,
  registerFailure: state.CustomerReducer.registerFailure
})

export default connect(mapStateToProps)(Register)