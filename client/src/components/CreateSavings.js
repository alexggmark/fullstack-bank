import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import savingsActions from '../actions/savings.actions'
import LoaderSwitch from './LoaderSwitch'

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
    <div className="input-form">
      <div className="input-form__tile">
        <h1>CreateSavings.js</h1>
        <div className="input-form__form-container">
          <input type="number" placeholder="total" onChange={(event) => handleInput(event, 'total')} />
          <input type="text" placeholder="nickName" onChange={(event) => handleInput(event, 'nickname')} />
          <button className="button-dark" onClick={() => createSavingsAccount()}>Submit</button>
        </div>
        <div className="input-form__loader-switch">
          <LoaderSwitch loading={props.createLoading} success={props.createSuccess} failure={props.createFailure} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  createLoading: state.SavingsReducer.createSavingsLoading,
  createSuccess: state.SavingsReducer.createSavingsSuccess,
  createFailure: state.SavingsReducer.createSavingsFailure,
})

export default connect(mapStateToProps)(CreateSavings)
