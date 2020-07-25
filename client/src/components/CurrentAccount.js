import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import currentActions from '../actions/current.actions'

const CurrentAccount = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentActions.getCurrentAccountsUser())
  }, [])

  const test = () => {
    dispatch(currentActions.getCurrentAccountsUser())
  }

  return (
    <div className="test">
      <h1>Current Account</h1>
      <button onClick={() => test()}>Get</button>
      <p>Loading: {props.populateCurrentLoading ? 'true' : 'false'}</p>
      <p>Success: {props.populateCurrentSuccess ? 'true' : 'false'}</p>
      <p>Failure: {props.populateCurrentFailure ? 'true' : 'false'}</p>
      <ul>
        {props.currentAccounts.map((item) => {
          return <li key={item._id}><strong>{item.nickName}</strong> - £{item.total} - {item.createdAt}</li>
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentAccounts: state.CurrentReducer.currentAccounts,
  populateCurrentLoading: state.CurrentReducer.populateCurrentLoading,
  populateCurrentFailure: state.CurrentReducer.populateCurrentFailure,
  populateCurrentSuccess: state.CurrentReducer.populateCurrentSuccess,
})

export default connect(mapStateToProps)(CurrentAccount)