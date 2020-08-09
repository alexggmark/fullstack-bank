import React, { useState, useEffect } from 'react'
import '../styles/modalComponent.scss'

const ModalComponent = (props) => {
  return (
    <>
      {props.open ?
        <div className="modal-component">
          <div className="modal-component__tile">
            <button className="close-button button-dark" onClick={props.onClick}>X</button>
            {props.children}
          </div>
        </div>
      : ''}
    </>
  )
}

export default ModalComponent