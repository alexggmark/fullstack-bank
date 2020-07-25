import React from 'react'
// import { useDispatch } from 'react-redux'
import customerServices from '../_services/customer.services'

const Logout = (props) => {
  // const dispatch = useDispatch()

  const logoutUser = () => {
    customerServices.logout()
  }

  return (
    <button onClick={() => logoutUser()}>LOGOUT</button>
  )
}

export default Logout