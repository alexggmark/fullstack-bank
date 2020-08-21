import React, { useEffect, useRef } from 'react'
import '../styles/loaderSwitch.scss'

const LoaderSwitch = (props) => {
  const loader = useRef()

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.loader-switch').classList.remove('success')
      document.querySelector('.loader-switch').classList.remove('failure')
    }, 2500)
  }, [props.success, props.failure])

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