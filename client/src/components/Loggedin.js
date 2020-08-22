import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import customerActions from '../actions/customer.actions'
import CreateCurrent from './CreateCurrent'
import CreateSavings from './CreateSavings'
import CurrentAccount from './CurrentAccount'
import TestDash from './TestDash'
import SavingsAccount from './SavingsAccount'
import MoneyMover from './MoneyMover'
import TransLogs from './TransLogs'
import Navigation from './Navigation'
import '../styles/loggedin.scss'

const Loggedin = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(customerActions.populateUserData())
  }, [])

  return (
    <BrowserRouter>
      <div className="loggedin">
        <div className="loggedin__nav" />
        <Navigation />
        <div className="loggedin__main">
          <div className="loggedin__main-container">

              <Switch>
                <Route path="/current">
                  <CreateCurrent />
                  <div className="loggedin__main-inner">
                    <CurrentAccount />
                  </div>
                </Route>
                <Route path="/savings">
                  <CreateSavings />
                  <div className="loggedin__main-inner">
                    <SavingsAccount />
                  </div>
                </Route>
                <Route path="/transfer">
                  <MoneyMover />
                  <div className="loggedin__main-inner">
                    <TransLogs />
                  </div>
                </Route>
                <Route path="/">
                  <div className="loggedin__main-inner">
                    <TestDash />
                  </div>
                  {/* <CurrentAccount />
                  <SavingsAccount />
                  <MoneyMover /> */}
                </Route>
              </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  // User props
  activeCurrentAccount: state.CustomerReducer.activeCurrentAccount,
  activeSavingsAccount: state.CustomerReducer.activeSavingsAccount,
  createdAt: state.CustomerReducer.createdAt,
  firstName: state.CustomerReducer.firstName,
  lastName: state.CustomerReducer.lastName,
  moneyStore: state.CustomerReducer.moneyStore,
  username: state.CustomerReducer.username,
  // User props
})

export default connect(mapStateToProps)(Loggedin)