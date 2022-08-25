import { Fragment } from "react"
import './Modal.css'

const Backdrop = (props) => {
  return (
    <div className="backdrop"></div>
  )
}

const ModalOverlay = (props) => {
  return (
    <div className="modal">{props.children}</div>
  )
}

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop />
      <ModalOverlay>
        {props.children}
      </ModalOverlay>
    </Fragment>
  )
}

export default Modal;