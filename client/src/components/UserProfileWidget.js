import React from 'react'
import { connect } from 'react-redux'
import Logout from './Logout'
import D3Chart from './D3Chart'
import '../styles/profileWidget.scss'

const UserProfileWidget = (props) => {
  return (
    <div className="profile-widget">
      {/* <h3>Hello {props.firstName},</h3> */}
      <p>Hello {props.firstName},</p>
      {props.activeCurrentAccount !== null &&
        props.activeSavingsAccount !== null &&
        props.moneyStore !== null ? (
          <D3Chart
            data={[
              { value: props.activeSavingsAccount },
              { value: props.activeCurrentAccount },
              { value: props.moneyStore }
            ]}
            inner={60}
            outer={100}
            height={220}
            width={220}
          />
        ) : ''}
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