import React from 'react'
import { connect } from 'react-redux'
import D3Chart from './D3Chart'
import { formatMoney, formatDate } from '../_helpers/formatStrings'
import LoaderComponent from '../components/LoaderComponent'
import safeImage from '../assets/safe.png'
import '../styles/dash.scss'
import '../styles/transitions.scss'

const TestDash = (props) => {
  return (
    <LoaderComponent
      loading={props.firstName === null}
    >
      <div className="dash">
        <div className="dash__tile">
          <h3>Welcome to your dashboard {props.username}</h3>
        </div>
        <div className="dash__tile dash__tile--block dash__tile--left">
          {props.activeCurrentAccount !== null &&
          props.activeSavingsAccount !== null &&
          props.moneyStore !== null ? (
            <D3Chart
              data={[
                { key: 'Savings', value: props.activeSavingsAccount },
                { key: 'Current', value: props.activeCurrentAccount },
                { key: 'Store', value: props.moneyStore }
              ]}
              annotated
              inner={90}
              outer={150}
              height={350}
              width={350}
            />
          ) : ''}
        </div>
        <div className="dash__tile dash__tile--block">
          <div className="dash__text">
            <h1>User Details</h1>
            <h3>User Details</h3>
            <ul>
              <li>Welcome, {props.username} {props.lastName}.</li>
              <li>You created your account on {formatDate(props.createdAt)}.</li>
            </ul>
            <h3>Account Details</h3>
            <ul>
              <li>You have £{formatMoney(props.moneyStore)} in your <span className="dash__store-text dash__store-text--store">store</span>.</li>
              <li>You have £{formatMoney(props.activeCurrentAccount)} in your <span className="dash__store-text dash__store-text--current">current account</span>.</li>
              <li>You have £{formatMoney(props.activeSavingsAccount)} in your <span className="dash__store-text dash__store-text--savings">savings account</span>.</li>
            </ul>
          </div>
        </div>
        <div className="dash__tile">
          <img src={safeImage} alt="Save it in an account!" className="dash__icon" />
        </div>
      </div>
    </LoaderComponent>
  )
}

const mapStateToProps = (state) => ({
  activeCurrentAccount: state.CustomerReducer.activeCurrentAccount,
  activeSavingsAccount: state.CustomerReducer.activeSavingsAccount,
  createdAt: state.CustomerReducer.createdAt,
  firstName: state.CustomerReducer.firstName,
  lastName: state.CustomerReducer.lastName,
  moneyStore: state.CustomerReducer.moneyStore,
  username: state.CustomerReducer.username,
})

export default connect(mapStateToProps)(TestDash)