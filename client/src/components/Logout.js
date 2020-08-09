import React from 'react'
import { useDispatch } from 'react-redux'
import {
  LOGOUT_USER
} from '../_constants/customer.constants'
import customerServices from '../_services/customer.services'

const Logout = (props) => {
  const dispatch = useDispatch()

  const logoutUser = () => {
    customerServices.logout()
    dispatch({
      type: LOGOUT_USER
    })
  }

  return (
    <button className="button-light" onClick={() => logoutUser()}>LOGOUT</button>
  )
}

export default Logout