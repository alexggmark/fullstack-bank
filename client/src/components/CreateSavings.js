import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import savingsActions from '../actions/savings.actions'

const CreateSavings = (props) => {
  const [ nickName, setNickname ] = useState(null)
  const [ total, setTotal ] = useState(null)
  const dispatch = useDispatch()

  const handleInput = (event, type) => {
    switch (type) {
      case 'nickname': setNickname(event.target.value)
        break
      case 'total': setTotal(event.target.value)
        break
      default: // do nothing
    }
  }

  const createSavingsAccount = () => {
    dispatch(savingsActions.createSavingsAccount({ total, nickName }))
  }

  return (
    <div className="test">
      <h1>CreateSavings.js</h1>
      <p>Nickname: {nickName}</p>
      <p>Total: {total}</p>
      <input type="number" placeholder="total" onChange={(event) => handleInput(event, 'total')} />
      <input type="text" placeholder="nickName" onChange={(event) => handleInput(event, 'nickname')} />
      <button onClick={() => createSavingsAccount()}>Submit</button>
      <p>Loading: {props.createLoading ? 'true' : 'false'}</p>
      <p>Success: {props.createSuccess ? 'true' : 'false'}</p>
      <p>Failure: {props.reateFailure ? 'true' : 'false'}</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  createLoading: state.SavingsReducer.createSavingsLoading,
  createSuccess: state.SavingsReducer.createSavingsSuccess,
  createFailure: state.SavingsReducer.createSavingsFailure,
})

export default connect(mapStateToProps)(CreateSavings)
