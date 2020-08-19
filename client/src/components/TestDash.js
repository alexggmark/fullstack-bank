import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import D3Chart from './D3Chart'
import '../styles/dash.scss'

const TestDash = (props) => {
  const myArr = [0, 1,2,3,4,5,6,7]
  const singles = [0,1,3,4,6,7]
  const left = [0,3,6]
  return (
    <div className="dash">
      {myArr.map((item, index) => {
        return (
          <div className={`
            dash__tile
            ${singles.includes(index) && 'dash__tile--block'}
            ${left.includes(index) && 'dash__tile--left'}
          `}>
            {props.activeCurrentAccount !== null &&
            props.activeSavingsAccount !== null &&
            props.moneyStore !== null ? (
              <D3Chart
                data={[
                  { value: props.activeSavingsAccount },
                  { value: props.activeCurrentAccount },
                  { value: props.moneyStore }
                ]}
                inner={90}
                outer={150}
                height={350}
                width={350}
              />
            ) : ''}
          </div>
        )
      })}
    </div>
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