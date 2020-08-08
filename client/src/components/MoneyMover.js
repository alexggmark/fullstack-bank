import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
// import translogServices from '../_services/translog.services'
import translogActions from '../actions/translog.actions'
import LoaderSwitch from '../components/LoaderSwitch'
import '../styles/inputForm.scss'

const MoneyMover = (props) => {
  const dispatch = useDispatch()
  const [fromValue, setFromValue] = useState('store')
  const [toValue, setToValue] = useState('store')
  const [sendValue, setSendValue] = useState(0)

  useEffect(() => {
    console.log(props.currentAccounts)
    console.log(props.savingsAccounts)
  }, [])

  const sendMoney = () => {
    if (!fromValue || !toValue) { return }
    dispatch(translogActions.transferMoney(sendValue, fromValue, toValue))
  }

  const handleSelect = (id, type) => {
    if (type === 0) setFromValue(id)
    if (type === 1) setToValue(id)
  }

  const handleValue = (event) => {
    setSendValue(event.target.value)
  }

  return (
    <div className="input-form">
      <div className="input-form__tile">
        <h1>Money mover</h1>
        <div className="input-form__form-container">
          <h3>From:</h3>
          <select onChange={(event) => handleSelect(event.target.value, 0)} defaultValue="store">
            <option value="store">Money Store</option>
            {props.currentAccounts.map((item) => {
              return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
            })}
            {props.savingsAccounts.map((item) => {
              return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
            })}
          </select>
          <h3>To:</h3>
          <select onChange={(event) => handleSelect(event.target.value, 1)} defaultValue="store">
            <option value="store">Money Store</option>
            {props.currentAccounts.map((item) => {
              return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
            })}
            {props.savingsAccounts.map((item) => {
              return <option key={'mm-' + item._id} value={item._id}>{item.nickName} - £{item.total}</option>
            })}
          </select>
          <input onChange={(event) => handleValue(event)} type="number" placeholder="Send value"></input>
          <button className="button-dark" onClick={() => sendMoney()}>Send</button>
        </div>
        <div className="input-form__loader-switch">
          <LoaderSwitch loading={props.createLoading} success={props.createSuccess} failure={props.createFailure} />
        </div>
      </div>
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