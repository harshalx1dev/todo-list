import React, { useContext, useState } from "react";
import Modal from "./Modal";
import ListStore from "../store/listStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import './ListItem.css'
import Input from "./Input";

const ListItem = (props) => {
  const [editValue, setEditValue] = useState(props.value)
  const [modalFlag, setModalFlag] = useState(false)
  const listCtx = useContext(ListStore)

  const showModal = () => {
    setModalFlag(true)
    setEditValue(props.value.trim())
  }

  const closeModal = () => {
    setModalFlag(false)
  }

  const editInpHandler = (event) => {
    setEditValue(event.target.value)
  }

  const deleteHandler = () => {
    listCtx.taskDeleteHandler(props.id)
  }

  const editSubmitHandler = (event) => {
    event.preventDefault();
    listCtx.taskEditHandler(props.id, editValue)
    closeModal()
  }

  return (
    <div className="listItem">
      {modalFlag && <Modal title="Edit Mode" onClick={closeModal}>
        <form className="editTaskForm" onSubmit={editSubmitHandler}>
          <Input id="editInp" label="Edit Task:" value={editValue} onChange={editInpHandler} />
          <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} /></button>
        </form>
      </Modal>}

      <li>
        {props.value}
      </li>

      <div>
        <button className="editBtn" onClick={showModal}><FontAwesomeIcon icon={faPen} /></button>
        <button className="deleteBtn" onClick={deleteHandler}><FontAwesomeIcon icon={faTrashCan} /></button>
      </div>
    </div>
  )
}

export default ListItem;