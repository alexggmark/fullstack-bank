import React, { useEffect, useState, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import currentActions from '../actions/current.actions'
import savingsActions from '../actions/savings.actions'
import translogActions from '../actions/translog.actions'
import LoaderComponent from '../components/LoaderComponent'
import LoaderSwitch from '../components/LoaderSwitch'
import {
  CONST_STORE
} from '../_constants/translog.constants'
import '../styles/inputForm.scss'

const MoneyMover = (props) => {
  const dispatch = useDispatch()
  const selectRef = useRef()
  const [fromValue, setFromValue] = useState(CONST_STORE)
  const [toValue, setToValue] = useState(CONST_STORE)
  const [sendValue, setSendValue] = useState(0)

  useEffect(() => {
    if (props.currentAccounts.length === 0) dispatch(currentActions.getCurrentAccountsUser())
    if (props.savingsAccounts.length === 0) dispatch(savingsActions.getSavingsAccountsUser())
  }, [])

  const fetchAccountData = () => {
    dispatch(currentActions.getCurrentAccountsUser())
    dispatch(savingsActions.getSavingsAccountsUser())
  }

  const resetState = () => {
    setFromValue(CONST_STORE)
    setToValue(CONST_STORE)
  }

  const sendMoney = async () => {
    if (!fromValue || !toValue) { return }
    try {
      await dispatch(translogActions.transferMoney(sendValue, fromValue, toValue))
      fetchAccountData()
      resetState()
      props.embedded && props.onClose()
    } catch (err) {
      resetState()
      console.error(err)
    }
  }

  const handleSelect = (id, type) => {
    if (type === 0) setFromValue(id)
    if (type === 1) setToValue(id)
  }

  const handleValue = (event) => {
    setSendValue(event.target.value)
  }

  const OptionTemplate = (item, namespace) => {
    return <option key={namespace + item._id} value={item._id}>{item.nickName} - £{item.total} ({item.accountType})</option>
  }

  return (
    <div
      className={`
        input-form
        ${props.account}
        ${props.embedded ? 'embedded' : ''}
      `}
      key={props.account}
    >
      <div className="input-form__tile">
        <h1>Money mover</h1>
        <div className="input-form__form-container">
          <LoaderComponent
            mininomargin={!props.embedded ? true : false}
            loading={
              props.populateCurrentLoading ||
              props.populateSavingsLoading ||
              props.updatingTranslogLoading
          }>
          <div className="input-form__form-block">
            <h3>From:</h3>
            <select
              ref={selectRef}
              onChange={(event) => handleSelect(event.target.value, 0)}
              defaultValue={`
                ${props.account ? props.account : CONST_STORE}
              `}
            >
              <option value={CONST_STORE}>Money Store</option>
              {props.currentAccounts.map(item => OptionTemplate(item, 'from'))}
              {props.savingsAccounts.map(item => OptionTemplate(item, 'from'))}
            </select>
          </div>
          <div className="input-form__form-block">
            <h3>To:</h3>
            <select onChange={(event) => handleSelect(event.target.value, 1)} defaultValue={CONST_STORE}>
              <option value={CONST_STORE}>Money Store</option>
              {props.currentAccounts.map(item => OptionTemplate(item, 'to'))}
              {props.savingsAccounts.map(item => OptionTemplate(item, 'to'))}
            </select>
          </div>
          <input onChange={(event) => handleValue(event)} type="number" placeholder="Send value"></input>
          <button className="button-cta" onClick={sendMoney}>Send</button>
          </LoaderComponent>
        </div>
        <LoaderSwitch loading={props.updatingTranslogLoading} success={props.updatingTranslogSuccess} failure={props.updatingTranslogFailure} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  updatingTranslogLoading: state.TranslogReducer.updatingTranslogLoading,
  updatingTranslogFailure: state.TranslogReducer.updatingTranslogFailure,
  updatingTranslogSuccess: state.TranslogReducer.updatingTranslogSuccess,
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