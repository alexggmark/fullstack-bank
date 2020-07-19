import React from 'react'
import { connect } from 'react-redux'

const Register = () => {
  return (
    <div>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <button>Register</button>
    </div>
  )
}

const mapStateToProps = ({  }) => {

}

export default connect(mapStateToProps)(Register)