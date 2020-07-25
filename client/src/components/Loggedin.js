import React, { useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import customerActions from '../actions/customer.actions'
import CreateCurrent from './CreateCurrent'
import CreateSavings from './CreateSavings'
import UserProfileWidget from './UserProfileWidget'
import CurrentAccount from './CurrentAccount'
import SavingsAccount from './SavingsAccount'
import Logout from './Logout'
import '../styles/loggedin.scss'

const Loggedin = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(customerActions.populateUserData())
  }, [])

  return (
    <div className="loggedin">
      <div className="loggedin__nav">
        <h2>Nav</h2>
        <ul>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
        <UserProfileWidget />
      </div>
      <div className="loggedin__main">
        <div className="loggedin__main-container">
          <CreateCurrent />
          <CreateSavings />
          <BrowserRouter>
            <Switch>
              <Route path="/">
                LOGIN:
                <Logout />
                <CurrentAccount />
                <SavingsAccount />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
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