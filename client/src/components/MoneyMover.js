import React, { useEffect, useState, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import currentActions from '../actions/current.actions'
import savingsActions from '../actions/savings.actions'
import translogActions from '../actions/translog.actions'
import LoaderComponent from '../components/LoaderComponent'
import '../styles/inputForm.scss'

const MoneyMover = (props) => {
  const dispatch = useDispatch()
  const selectRef = useRef()
  const [fromValue, setFromValue] = useState('store')
  const [toValue, setToValue] = useState('store')
  const [sendValue, setSendValue] = useState(0)

  useEffect(() => {
    if (props.currentAccounts.length === 0) dispatch(currentActions.getCurrentAccountsUser())
    if (props.savingsAccounts.length === 0) dispatch(savingsActions.getSavingsAccountsUser())
  }, [])

  const fetchAccountData = () => {
    dispatch(currentActions.getCurrentAccountsUser())
    dispatch(savingsActions.getSavingsAccountsUser())
  }

  const sendMoney = async () => {
    if (!fromValue || !toValue) { return }
    try {
      await dispatch(translogActions.transferMoney(sendValue, fromValue, toValue))
      fetchAccountData()
      props.onClose()
    } catch (err) {
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
              mininomargin
              loading={
                props.populateCurrentLoading ||
                props.populateSavingsLoading ||
                props.updatingTranslogLoading
              }>
              <h3>From:</h3>
              <select
                ref={selectRef}
                onChange={(event) => handleSelect(event.target.value, 0)}
                defaultValue={`
                  ${props.account ? props.account : 'store'}
                `}
              >
                <option value="store">Money Store</option>
                {props.currentAccounts.map(item => OptionTemplate(item, 'from'))}
                {props.savingsAccounts.map(item => OptionTemplate(item, 'from'))}
              </select>
              <h3>To:</h3>
              <select onChange={(event) => handleSelect(event.target.value, 1)} defaultValue="store">
                <option value="store">Money Store</option>
                {props.currentAccounts.map(item => OptionTemplate(item, 'to'))}
                {props.savingsAccounts.map(item => OptionTemplate(item, 'to'))}
              </select>
              <input onChange={(event) => handleValue(event)} type="number" placeholder="Send value"></input>
              <button className="button-dark" onClick={sendMoney}>Send</button>
            </LoaderComponent>
          </div>
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