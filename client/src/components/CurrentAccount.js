import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import currentActions from '../actions/current.actions'
import LoaderComponent from './LoaderComponent'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../styles/transitions.scss'

const CurrentAccount = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentActions.getCurrentAccountsUser())
  }, [])

  const deleteAccount = (id) => {
    dispatch(currentActions.deleteCurrentAccount({ id }))
  }

  return (
    <LoaderComponent
      loading={props.populateCurrentLoading}
    >
      <h1>Current Account</h1>
      <div className="account">
        <TransitionGroup
          className="trans"
        >
          {[...props.currentAccounts].reverse().map((item) => {
            return (
              <CSSTransition
                classNames="account-item"
                key={item._id}
                timeout={500}
              >
                <div className="account__tile">
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
  currentAccounts: state.CurrentReducer.currentAccounts,
  populateCurrentLoading: state.CurrentReducer.populateCurrentLoading,
  populateCurrentFailure: state.CurrentReducer.populateCurrentFailure,
  populateCurrentSuccess: state.CurrentReducer.populateCurrentSuccess,
})

export default connect(mapStateToProps)(CurrentAccount)