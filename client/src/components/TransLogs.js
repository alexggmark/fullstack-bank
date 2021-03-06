import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import translogActions from '../actions/translog.actions'
import LoaderComponent from './LoaderComponent'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import '../styles/logs.scss'

const TransLogs = (props) => {
  const dispatch = useDispatch()
  const [loadmoreCounter, setLoadmoreCounter] = useState(1)

  useEffect(() => {
    dispatch(translogActions.populateTranslogData())
  }, [])

  const loadMore = () => {
    setLoadmoreCounter(loadmoreCounter + 1)
    dispatch(translogActions.loadMoreTranslogData(loadmoreCounter))
  }

  return (
    <LoaderComponent
      loading={props.populateTranslogLoading}
    >
      <div className="logs">
        <h1>Transfer Logs</h1>
        <LoaderComponent mini loading={props.updatingTranslogLoading}></LoaderComponent>
        <TransitionGroup
          className="trans"
        >
          {[...props.translogs].reverse().map((item, index) => {
            return (
              <CSSTransition
                classNames="account-item"
                key={item._id}
                timeout={500}
              >
                <li className={`
                  logs__tile
                  ${item.accountType === 'savings' ? 'savings' : ''}
                  ${item.accountType === 'current' ? 'current' : ''}
                  ${item.accountType === 'store' ? 'store' : ''}
                `}>
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
        <button className="button-dark" onClick={loadMore}>Load more</button>
      </div>
    </LoaderComponent>
  )
}

const mapStateToProps = (state) => ({
  translogs: state.TranslogReducer.translogs,
  populateTranslogLoading: state.TranslogReducer.populateTranslogLoading,
  populateTranslogFailure: state.TranslogReducer.populateTranslogFailure,
  populateTranslogSuccess: state.TranslogReducer.populateTranslogSuccess,
  updatingTranslogLoading: state.TranslogReducer.updatingTranslogLoading,
  updatingTranslogFailure: state.TranslogReducer.updatingTranslogFailure,
  updatingTranslogSuccess: state.TranslogReducer.updatingTranslogSuccess,
})

export default connect(mapStateToProps)(TransLogs)