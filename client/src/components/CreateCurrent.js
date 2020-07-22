import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import currentActions from '../actions/current.actions'

const CreateCurrent = (props) => {
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

  const createCurrentAccount = () => {
    dispatch(currentActions.createCurrentAccount({ total, nickName }))
  }

  return (
    <div className="test">
      <h1>CreateCurrent.js</h1>
      <p>Nickname: {nickName}</p>
      <p>Total: {total}</p>
      <input type="number" placeholder="total" onChange={(event) => handleInput(event, 'total')} />
      <input type="text" placeholder="nickName" onChange={(event) => handleInput(event, 'nickname')} />
      <button onClick={() => createCurrentAccount()}>Submit</button>
      <p>Loading: {props.createLoading ? 'true' : 'false'}</p>
      <p>Success: {props.createSuccess ? 'true' : 'false'}</p>
      <p>Failure: {props.reateFailure ? 'true' : 'false'}</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  createLoading: state.CurrentReducer.createCurrentLoading,
  createSuccess: state.CurrentReducer.createCurrentSuccess,
  createFailure: state.CurrentReducer.createCurrentFailure,
})

export default connect(mapStateToProps)(CreateCurrent)

/*
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  total: { type: Number, default: 0 },
  interestGenerated: { type: Number, default: 0 },
  nickName: { type: String, required: true }
*/