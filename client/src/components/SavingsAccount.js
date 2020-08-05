import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import savingsActions from '../actions/savings.actions'
import LoaderComponent from './LoaderComponent'
import '../styles/accounts.scss'

const SavingsAccount = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(savingsActions.getSavingsAccountsUser())
  }, [])

  const test = () => {
    dispatch(savingsActions.getSavingsAccountsUser())
  }

  return (

      <LoaderComponent
        loading={props.populateSavingsLoading}
      >
        <h1>Savings Account</h1>
        <div className="account">
          {props.savingsAccounts.map((item) => {
            // return <div key={item._id}><strong>{item.nickName}</strong> - £{item.total} - {item.createdAt}</div>
            return (
              <div className="account__tile" key={item._id}>
                <div className="account__block">
                  <h3>Account NickName</h3>
                  <span className="text-sub-info">{item.nickName}</span>
                </div>
                <div className="account__block">
                  <h3>Total</h3>
                  <span className="text-info">£{item.total}</span>
                </div>
                <div className="account__block">
                  <h3>Created on</h3>
                  <span className="text-sub-info">{item.createdAt}</span>
                </div>
                <div className="account__block">
                  <h3>Recent transaction</h3>
                </div>
              </div>
            )
          })}
        </div>
      </LoaderComponent>

  )
}

const mapStateToProps = (state) => ({
  savingsAccounts: state.SavingsReducer.savingsAccounts,
  populateSavingsLoading: state.SavingsReducer.populateSavingsLoading,
  populateSavingsFailure: state.SavingsReducer.populateSavingsFailure,
  populateSavingsSuccess: state.SavingsReducer.populateSavingsSuccess,
})

export default connect(mapStateToProps)(SavingsAccount)