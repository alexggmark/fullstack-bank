import React from 'react'
import loaderGifLogin from '../assets/rippleloader-login.gif'
import loaderGif from '../assets/rippleload.svg'

const LoaderComponent = (props) => {
  return (
    <>
    {props.loading ? (
      <img
        src={`
          ${props.login ? loaderGifLogin : loaderGif}
        `}
        className={`
          loader
          ${props.mini ? 'mini' : ''}
          ${props.mininomargin ? 'mini-no-margin' : ''}
        `}
      />
    ) : props.children}
    </>
  )
}

export default LoaderComponent;