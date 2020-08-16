import React, { useEffect } from 'react'
import '../styles/loaderSwitch.scss'

const LoaderSwitch = (props) => {
  return (
    <div className={'loader-switch ' +
      `${props.loading ? 'loading' : ''}` +
      `${props.success ? 'success' : ''}` +
      `${props.failure ? 'failure' : ''}`}>
      <div className="loader-switch__ball"></div>
    </div>
  )
}

export default LoaderSwitch