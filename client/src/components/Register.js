import React from 'react'
import { connect } from 'react-redux'

const Register = () => {
  return (
    <div className="register">
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <button className="button-inverse">Register</button>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Register)