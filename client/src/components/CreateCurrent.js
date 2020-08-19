import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import currentActions from '../actions/current.actions'
import LoaderSwitch from './LoaderSwitch'
import '../styles/inputForm.scss'

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

  const createCurrentAccount = async () => {
    dispatch(currentActions.createCurrentAccount({ total, nickName }))
  }

  return (
    <div className="input-form">
      <div className="input-form__tile">
        <h1>Create a Current Account</h1>
        <div className="input-form__form-container">
          <input type="number" placeholder="total" onChange={(event) => handleInput(event, 'total')} />
          <input type="text" placeholder="nickName" onChange={(event) => handleInput(event, 'nickname')} />
          <button className="button-cta" onClick={() => createCurrentAccount()}>Submit</button>
        </div>
        <div className="input-form__loader-switch">
          <LoaderSwitch loading={props.createLoading} success={props.createSuccess} failure={props.createFailure} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  createLoading: state.CurrentReducer.createCurrentLoading,
  createSuccess: state.CurrentReducer.createCurrentSuccess,
  createFailure: state.CurrentReducer.createCurrentFailure,
})

export default connect(mapStateToProps)(CreateCurrent)
