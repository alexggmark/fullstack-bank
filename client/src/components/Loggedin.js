import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateCurrent from './CreateCurrent'
import '../styles/loggedin.scss'

const Loggedin = (props) => {
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
      </div>
      <div className="loggedin__main">
        <div className="loggedin__main-container">
          <div className="test">
            <h1>User data in store</h1>
            <ul>
              <li>activeCurrentAccount: {props.activeCurrentAccount ? 'true' : 'false'}</li>
              <li>activeSavingsAccount: {props.activeSavingsAccount ? 'true' : 'false'}</li>
              <li>createdAt: {props.createdAt}</li>
              <li>firstName: {props.firstName}</li>
              <li>lastName: {props.lastName}</li>
              <li>moneyStore: {props.moneyStore}</li>
              <li>username: {props.username}</li>
            </ul>
          </div>
          <CreateCurrent />
          <BrowserRouter>
            <Switch>
              <Route path="/">
                LOGIN:
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