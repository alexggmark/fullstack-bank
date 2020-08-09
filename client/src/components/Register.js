import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import customerActions from '../actions/customer.actions'

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
        console.log(firstname)
        break
      case 'l':
        setLastname(event.target.value)
        console.log(lastname)
        break
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

  const registerMethod = () => {
    if (!username || !password) { return }
    const credentials = { username, password, firstname, lastname }
    dispatch(customerActions.registerAction(credentials))
  }

  return (
    <div className="register">
      <input type="text" placeholder="First Name" onChange={(event) => handleInput(event, 'f')} />
      <input type="text" placeholder="Last Name" onChange={(event) => handleInput(event, 'l')} />
      <input type="text" placeholder="Username" onChange={(event) => handleInput(event, 'u')} />
      <input type="text" placeholder="Password" onChange={(event) => handleInput(event, 'p')} />
      <button className="button-inverse" onClick={() => registerMethod()}>Register</button>
      <div>
        <p>Register loading: {props.loginLoading ? 'true' : 'false'}</p>
        <p>Register success: {props.loginSuccess ? 'true' : 'false'}</p>
        <p>Register failure: {props.loginFailure ? 'true' : 'false'}</p>
      </div>
      <Link to="/">Login</Link>
    </div>
  )
}

const mapStateToProps = (state) => ({
  // FIXME:
})

export default connect(mapStateToProps)(Register)