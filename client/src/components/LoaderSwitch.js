import React, { useEffect, useState } from 'react'
import '../styles/loaderSwitch.scss'

const LoaderSwitch = (props) => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) { return }
    if (props.success) setSuccess(true)
    if (props.failure) setFailure(true)

    setTimeout(() => {
      setSuccess(false)
      setFailure(false)
    }, 2500)
  }, [props.success, props.failure])

  useEffect(() => {
    setFirstLoad(false)
  }, [])

  return (
    <div className={'loader-switch ' +
      `${props.loading ? 'loading' : ''}` +
      `${success ? 'success' : ''}` +
      `${failure ? 'failure' : ''}`}>
      <div className="loader-switch__ball"></div>
    </div>
  )
}

export default LoaderSwitch