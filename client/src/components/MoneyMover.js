import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
// import transactionsActions from '../actions/transactions.actions'
import transactionServices from '../_services/translog.services'

const MoneyMover = (props) => {
  const dispatch = useDispatch()
  const [fromValue, setFromValue] = useState('store')
  const [toValue, setToValue] = useState('store')
  const [sendValue, setSendValue] = useState(0)

  const sendMoney = () => {
    if (!fromValue || !toValue) { return }
    transactionServices.transferMoney(sendValue, fromValue, toValue)
  }

  const handleSelect = (id, type) => {
    if (type === 0) setFromValue(id)
    if (type === 1) setToValue(id)
  }

  const handleValue = (event) => {
    setSendValue(event.target.value)
  }

  return (
    <div className="test">
      <h1>Money mover</h1>
      <p>{fromValue}</p>
      <p>{toValue}</p>
      <p>{sendValue}</p>
      From: <select onChange={(event) => handleSelect(event.target.value, 0)} defaultValue="store">
        <option value="store">Money Store</option>
        {props.currentAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
        {props.savingsAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
      </select>
      To: <select onChange={(event) => handleSelect(event.target.value, 1)} defaultValue="store">
        <option value="store">Money Store</option>
        {props.currentAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
        {props.savingsAccounts.map((item) => {
          return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
        })}
      </select>
      <input onChange={(event) => handleValue(event)} type="number" placeholder="Send value"></input>
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