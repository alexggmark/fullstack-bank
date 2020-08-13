import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import D3Chart from './D3Chart'
import '../styles/accounts.scss'

const TestDash = (props) => {
  useEffect(() => {

  }, [])

  return (
    <div className="account">
      <div className="account__tile">
        <D3Chart
          saving={props.activeSavingsAccount}
          current={props.activeCurrentAccount}
          store={props.moneyStore}
        />
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