import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import translogActions from '../actions/translog.actions'
import LoaderComponent from './LoaderComponent'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import '../styles/logs.scss'

const TransLogs = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(translogActions.populateTranslogData())
    console.log(props.translogs)
  }, [])

  return (
    <LoaderComponent
      loading={props.populateTranslogLoading}
    >
      <div className="logs">
        <h1 className="leading">Transaction Logs</h1>
        <TransitionGroup
          className="trans"
        >
          {props.translogs.map((item, index) => {
            return (
              <CSSTransition
                classNames="account-item"
                key={item._id}
                timeout={500}
              >
                <li className="logs__tile">
                  <div className="logs__block">
                    <h3>Account Type</h3>
                    <span className="text-sub-info">{item.accountType}</span>
                  </div>
                  <div className="logs__block">
                    <h3>Value</h3>
                    <span className="text-sub-info">£{formatMoney(item.value)}</span>
                  </div>
                  <div className="logs__block">
                    <h3>Created on</h3>
                    <span className="text-sub-info">{formatDate(item.createdAt)}</span>
                  </div>
                </li>
              </CSSTransition>
          )})}
        </TransitionGroup>
      </div>
    </LoaderComponent>
  )
}

const mapStateToProps = (state) => ({
  translogs: state.TranslogReducer.translogs,
  populateTranslogLoading: state.TranslogReducer.populateTranslogLoading,
  populateTranslogFailure: state.TranslogReducer.populateTranslogFailure,
  populateTranslogSuccess: state.TranslogReducer.populateTranslogSuccess
})

export default connect(mapStateToProps)(TransLogs)