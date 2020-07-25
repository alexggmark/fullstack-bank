import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import currentActions from '../actions/current.actions'
import savingsActions from '../actions/savings.actions'

const MoneyMover = (props) => {
  const dispatch = useDispatch()
  const [fromValue, setFromValue] = useState('store')
  const [toValue, setToValue] = useState('store')

  const sendMoney = () => {
    if (!fromValue || !toValue) { return }

    dispatch()
  }

  const handleSelect = (id, type) => {
    if (type === 0) setFromValue(id)
    if (type === 1) setToValue(id)
  }

  return (
    <div className="test">
      <p>{fromValue}</p>
      <p>{toValue}</p>
      From: <select onChange={(event) => handleSelect(event.target.value, 0)} value={fromValue} defaultValue="store">
        <option value="store">Money Store</option>
        {props.currentAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
        {props.savingsAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
      </select>
      To: <select onChange={(event) => handleSelect(event.target.value, 1)} value={toValue} defaultValue="store">
        <option value="store">Money Store</option>
        {props.currentAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
        {props.savingsAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
      </select>
      <button onClick={() => sendMoney()}>Send</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentAccounts: state.CurrentReducer.currentAccounts,
  populateCurrentLoading: state.CurrentReducer.populateCurrentLoading,
  populateCurrentFailure: state.CurrentReducer.populateCurrentFailure,
  populateCurrentSuccess: state.CurrentReducer.populateCurrentSuccess,
  savingsAccounts: state.SavingsReducer.savingsAccounts,
  populateSavingsLoading: state.SavingsReducer.populateSavingsLoading,
  populateSavingsFailure: state.SavingsReducer.populateSavingsFailure,
  populateSavingsSuccess: state.SavingsReducer.populateSavingsSuccess,
})

export default connect(mapStateToProps)(MoneyMover)