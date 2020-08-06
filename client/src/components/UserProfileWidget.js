import React from 'react'
import { connect } from 'react-redux'
import Logout from './Logout'
import { formatDate, formatMoney } from '../_helpers/formatStrings'
import '../styles/profileWidget.scss'

const UserProfileWidget = (props) => {
  return (
    <div className="profile-widget">
      <p>Hello {props.firstName},</p>
      <p>You have £{formatMoney(props.moneyStore)} in store</p>
      <p>You joined {formatDate(props.createdAt)}</p>
      {/* <ul>
        <li>activeCurrentAccount: {props.activeCurrentAccount ? 'true' : 'false'}</li>
        <li>activeSavingsAccount: {props.activeSavingsAccount ? 'true' : 'false'}</li>
        <li>createdAt: {props.createdAt}</li>
        <li>firstName: {props.firstName}</li>
        <li>lastName: {props.lastName}</li>
        <li>moneyStore: {props.moneyStore}</li>
        <li>username: {props.username}</li>
        <li>totalCurrent: {props.totalCurrent}</li>
        <li>totalSavings: {props.totalSavings}</li>
      </ul> */}
      <Logout />
    </div>
  )
}

const mapStateToprops = (state) => ({
  activeCurrentAccount: state.CustomerReducer.activeCurrentAccount,
  activeSavingsAccount: state.CustomerReducer.activeSavingsAccount,
  createdAt: state.CustomerReducer.createdAt,
  firstName: state.CustomerReducer.firstName,
  lastName: state.CustomerReducer.lastName,
  moneyStore: state.CustomerReducer.moneyStore,
  username: state.CustomerReducer.username,
  totalCurrent: state.CustomerReducer.totalCurrent,
  totalSavings: state.CustomerReducer.totalSavings
})

export default connect(mapStateToprops)(UserProfileWidget)