import React from 'react'
import { ReactComponent as Cross } from '../assets/cross.svg'
import { CSSTransition } from 'react-transition-group'
import '../styles/modalComponent.scss'

const ModalComponent = (props) => {
  return (
    <CSSTransition
      in={props.open}
      classNames="small"
      timeout={100}
      mountOnEnter
      unmountOnExit
    >
      <div className="modal-component">
        <div className="modal-component__tile">
          <div className="modal-component__button" onClick={props.onClick}>
            <Cross />
          </div>
          {props.children}
        </div>
      </div>
    </CSSTransition>
  )
}

export default ModalComponent