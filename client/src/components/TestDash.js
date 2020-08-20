import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import D3Chart from './D3Chart'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import '../styles/dash.scss'

const TestDash = (props) => {
  return (
    <div className="dash">
      <div className="dash__tile">
        <h3>This area is a work in progress</h3>
      </div>
      <div className="dash__tile dash__tile--block dash__tile--left">
        {props.activeCurrentAccount !== null &&
        props.activeSavingsAccount !== null &&
        props.moneyStore !== null ? (
          <D3Chart
            data={[
              { value: props.activeSavingsAccount },
              { value: props.activeCurrentAccount },
              { value: props.moneyStore }
            ]}
            inner={90}
            outer={150}
            height={350}
            width={350}
          />
        ) : ''}
      </div>
      <div className="dash__tile dash__tile--block">
        <div className="dash__text">
          <h1>User Details</h1>
          <h3>User Details</h3>
          <ul>
            <li>Welcome, {props.username} {props.lastName}.</li>
            <li>You created your account on {formatDate(props.createdAt)}.</li>
          </ul>
          <h3>Account Details</h3>
          <ul>
            <li>You have £{formatMoney(props.moneyStore)} in your store.</li>
            <li>You have £{formatMoney(props.activeCurrentAccount)} in your current account.</li>
            <li>You have £{formatMoney(props.activeSavingsAccount)} in your savings account.</li>
          </ul>
        </div>
      </div>
      <div className="dash__tile">
        <h3>This area will chart movement and transactions visually</h3>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeCurrentAccount: state.CustomerReducer.activeCurrentAccount,
  activeSavingsAccount: state.CustomerReducer.activeSavingsAccount,
  createdAt: state.CustomerReducer.createdAt,
  firstName: state.CustomerReducer.firstName,
  lastName: state.CustomerReducer.lastName,
  moneyStore: state.CustomerReducer.moneyStore,
  username: state.CustomerReducer.username,
})

export default connect(mapStateToProps)(TestDash)