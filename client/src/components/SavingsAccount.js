import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import savingsActions from '../actions/savings.actions'
import customerActions from '../actions/customer.actions'
import LoaderComponent from './LoaderComponent'
import ModalComponent from '../components/ModalComponent'
import MoneyMover from '../components/MoneyMover'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../styles/transitions.scss'

const SavingsAccount = (props) => {
  const dispatch = useDispatch()
  const [transId, setTransId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    dispatch(savingsActions.getSavingsAccountsUser())
  }, [])

  const deleteAccount = (id) => {
    dispatch(savingsActions.deleteSavingsAccount({ id }))
  }

  const handleTransfer = (id) => {
    setTransId(id)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <LoaderComponent
      loading={props.populateSavingsLoading}
    >
      <h1>Savings Accounts</h1>
      <div className="account">
        <TransitionGroup
          className="trans"
        >
          {[...props.savingsAccounts].reverse().map((item) => {
            return (
              <CSSTransition
                classNames="account-item"
                key={item._id}
                timeout={500}
              >
                <div className="account__tile">
                  <div className="account__block">
                    <h3>Account NickName</h3>
                    <span className="text-sub-info">{item.nickName}</span>
                  </div>
                  <div className="account__block">
                    <h3>Total</h3>
                    <span className="text-info">£{formatMoney(item.total)}</span>
                  </div>
                  <div className="account__block">
                    <h3>Created on</h3>
                    <span className="text-sub-info">{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="account__block">
                    <h3>Recent transaction</h3>
                  </div>
                  <div className="account__block">
                    <button className="button-dark" onClick={() => handleTransfer(item._id)}>Transfer</button>
                  </div>
                  <div className="account__block">
                    <button className="button-dark" onClick={() => deleteAccount(item._id)}>Delete</button>
                  </div>
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>
      <ModalComponent onClick={closeModal} open={modalOpen}>
        <MoneyMover embedded account={transId} onClose={closeModal} />
      </ModalComponent>
    </LoaderComponent>
  )
}

const mapStateToProps = (state) => ({
  savingsAccounts: state.SavingsReducer.savingsAccounts,
  populateSavingsLoading: state.SavingsReducer.populateSavingsLoading,
  populateSavingsFailure: state.SavingsReducer.populateSavingsFailure,
  populateSavingsSuccess: state.SavingsReducer.populateSavingsSuccess,
})

export default connect(mapStateToProps)(SavingsAccount)