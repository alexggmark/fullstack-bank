import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'
import '../styles/loginlanding.scss'

const LoginLanding = () => {
  return (
    <div>
      <Login />
      <Register />
    </div>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(LoginLanding)