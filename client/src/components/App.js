import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'

const App = () => {
  return (
    <div className="app">
      <Login />
      <Register />
    </div>
  )
}

const mapStateToProps = ({ Login }) => {

}

export default connect(mapStateToProps)(App)