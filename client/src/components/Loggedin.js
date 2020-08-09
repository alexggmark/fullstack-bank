import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import customerActions from '../actions/customer.actions'
import CreateCurrent from './CreateCurrent'
import CreateSavings from './CreateSavings'
import CurrentAccount from './CurrentAccount'
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
        <div className="loggedin__nav">
          {/* <Piggy className="logo" />
          <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/current">Current Account</Link></li>
              <li><Link to="/savings">Savings Account</Link></li>
              <li><Link to="/transfer">Transfer Money</Link></li>
              <li><Link to="/logs">Transfer Logs</Link></li>

          </ul>
          <UserProfileWidget /> */}
        </div>
        <Navigation />
        <div className="loggedin__main">
          <div className="loggedin__main-container">

              <Switch>
                <Route path="/current">
                  <CreateCurrent />
                  <CurrentAccount />
                </Route>
                <Route path="/savings">
                  <CreateSavings />
                  <SavingsAccount />
                </Route>
                <Route path="/transfer">
                  <MoneyMover />
                  <TransLogs />
                </Route>
                <Route path="/logs">
                  <TransLogs />
                </Route>
                <Route path="/">
                  <CurrentAccount />
                  <SavingsAccount />
                  <MoneyMover />
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