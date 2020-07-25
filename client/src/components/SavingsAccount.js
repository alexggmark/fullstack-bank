import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import savingsActions from '../actions/savings.actions'

const SavingsAccount = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(savingsActions.getSavingsAccountsUser())
  }, [])

  const test = () => {
    dispatch(savingsActions.getSavingsAccountsUser())
  }

  return (
    <div className="test">
      <h1>Savings Account</h1>
      <button onClick={() => test()}>Get</button>
      <p>Loading: {props.populateSavingsLoading ? 'true' : 'false'}</p>
      <p>Success: {props.populateSavingsSuccess ? 'true' : 'false'}</p>
      <p>Failure: {props.populateSavingsFailure ? 'true' : 'false'}</p>
      <ul>
        {props.savingsAccounts.map((item) => {
          return <li key={item._id}><strong>{item.nickName}</strong> - £{item.total} - {item.createdAt}</li>
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  savingsAccounts: state.SavingsReducer.savingsAccounts,
  populateSavingsLoading: state.SavingsReducer.populateSavingsLoading,
  populateSavingsFailure: state.SavingsReducer.populateSavingsFailure,
  populateSavingsSuccess: state.SavingsReducer.populateSavingsSuccess,
})

export default connect(mapStateToProps)(SavingsAccount)