import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import transactionServices from '../_services/transactions.services'

const TransLogs = (props) => {
  const [translog, setTranslog] = useState(null)
  useEffect(() => {
    transactionServices.getTransLogs()
      .then((res) => {
        setTranslog(res)
      })
  }, [])

  return (
    <div className="test">
      <h1>Transaction Logs</h1>
      {/* {translog} */}
      {translog ? translog.map(item => {
        return (
        <li key={item._id}>
          {item.logType}: {item.accountType} - £{item.value} - {item.createdAt}
        </li>
      )}) : ''}
      <button onClick={() => transactionServices.getTransLogs()}>Get data</button>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(TransLogs)