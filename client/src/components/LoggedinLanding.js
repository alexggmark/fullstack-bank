import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'

const LoggedinLanding = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/test">
          Test
        </Route>
        <Route path="/">
          LOGIN:
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(LoggedinLanding)