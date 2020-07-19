import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/loggedin.scss'

const Loggedin = () => {
  const getUserData = () => {
    console.log('Test')
  }

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
          <button onClick={() => getUserData()}>Click for user</button>
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

})

export default connect(mapStateToProps)(Loggedin)