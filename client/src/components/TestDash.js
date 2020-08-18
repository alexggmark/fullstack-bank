import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import D3Chart from './D3Chart'
import '../styles/accounts.scss'

const TestDash = (props) => {
  return (
    <div className="account">
      <div className="account__tile">
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
            height={250}
            width={250}
          />
        ) : ''}
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