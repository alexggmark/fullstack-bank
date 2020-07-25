import React from 'react'
import { connect } from 'react-redux'

const UserProfileWidget = (props) => {
  return (
    <div className="test">
      <h1>User data in store</h1>
      <ul>
        <li>activeCurrentAccount: {props.activeCurrentAccount ? 'true' : 'false'}</li>
        <li>activeSavingsAccount: {props.activeSavingsAccount ? 'true' : 'false'}</li>
        <li>createdAt: {props.createdAt}</li>
        <li>firstName: {props.firstName}</li>
        <li>lastName: {props.lastName}</li>
        <li>moneyStore: {props.moneyStore}</li>
        <li>username: {props.username}</li>
        <li>totalCurrent: {props.totalCurrent}</li>
        <li>totalSavings: {props.totalSavings}</li>
      </ul>
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