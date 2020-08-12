import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/accounts.scss'

const TestDash = () => {
  useEffect(() => {

  }, [])

  return (
    <div className="account">
      <div className="account__tile">
        <span className="text-sub-info">This will be the dashboard, try navigating elsewhere.</span>
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