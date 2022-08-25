import { Fragment } from "react";
import ListStore from "../store/listStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './Modal.css'

const Backdrop = (props) => {
  return (
    <div className="backdrop" onClick={props.onClick}></div>
  )
}

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="modalWrap">
        <h2>{props.title}</h2>
        <button className="modalCloseBtn" onClick={props.onClick}><FontAwesomeIcon icon={faXmark} size="3x" /></button>
      </div>
      {props.children}
    </div>
  )
}

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClick={props.onClick} />
      <ModalOverlay title={props.title} onClick={props.onClick}>
        {props.children}
      </ModalOverlay>
    </Fragment>
  )
}

export default Modal;