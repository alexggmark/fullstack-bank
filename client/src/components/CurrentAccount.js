import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import currentActions from '../actions/current.actions'
import LoaderComponent from './LoaderComponent'

const CurrentAccount = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentActions.getCurrentAccountsUser())
  }, [])

  return (
    <LoaderComponent
      loading={props.populateCurrentLoading}
    >
      <h1>Current Account</h1>
      <div className="account">
        {props.currentAccounts.map((item) => {
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
  currentAccounts: state.CurrentReducer.currentAccounts,
  populateCurrentLoading: state.CurrentReducer.populateCurrentLoading,
  populateCurrentFailure: state.CurrentReducer.populateCurrentFailure,
  populateCurrentSuccess: state.CurrentReducer.populateCurrentSuccess,
})

export default connect(mapStateToProps)(CurrentAccount)