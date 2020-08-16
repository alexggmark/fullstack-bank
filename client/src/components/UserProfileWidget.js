import React from 'react'
import { connect } from 'react-redux'
import Logout from './Logout'
// import D3Chart from './D3Chart'
import { formatDate, formatMoney } from '../_helpers/formatStrings'
import '../styles/profileWidget.scss'

const UserProfileWidget = (props) => {
  return (
    <div className="profile-widget">
      <h3>User Profile</h3>
      <p>Hello {props.firstName},</p>
      <p><span className="text-sub-info">Current:</span> £{formatMoney(props.activeCurrentAccount)}</p>
      <p><span className="text-sub-info">Savings:</span> £{formatMoney(props.activeSavingsAccount)}</p>
      <span className="text-info">£{formatMoney(props.moneyStore)}</span>
      <p><span className="text-sub-info">You joined {formatDate(props.createdAt)}</span></p>
      <Logout />
      {/* <D3Chart
        saving={props.activeSavingsAccount}
        current={props.activeCurrentAccount}
        store={props.moneyStore}
      /> */}
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