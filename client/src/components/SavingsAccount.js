import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import savingsActions from '../actions/savings.actions'
import LoaderComponent from './LoaderComponent'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../styles/accounts.scss'

const SavingsAccount = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(savingsActions.getSavingsAccountsUser())
  }, [])

  const deleteAccount = (id) => {
    dispatch(savingsActions.deleteSavingsAccount({ id }))
  }

  return (
    <LoaderComponent
      loading={props.populateSavingsLoading}
    >
      <h1>Savings Account</h1>
      <div className="account">
        <TransitionGroup
          className="trans"
        >
          {[...props.savingsAccounts].reverse().map((item) => {
            return (
              <CSSTransition
                classNames="account-item"
                key={item._id}
                timeout={500}
              >
                <div className="account__tile" key={item._id}>
                  <div className="account__block">
                    <h3>Account NickName</h3>
                    <span className="text-sub-info">{item.nickName}</span>
                  </div>
                  <div className="account__block">
                    <h3>Total</h3>
                    <span className="text-info">£{formatMoney(item.total)}</span>
                  </div>
                  <div className="account__block">
                    <h3>Created on</h3>
                    <span className="text-sub-info">{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="account__block">
                    <h3>Recent transaction</h3>
                  </div>
                  <div className="account__block">
                    <button className="button-dark">Transfer</button>
                  </div>
                  <div className="account__block">
                    <button className="button-dark" onClick={() => deleteAccount(item._id)}>Delete</button>
                  </div>
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
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