import React, { useContext } from "react";
import Modal from "./Modal";
import ListStore from "../store/listStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import './ListItem.css'
import Input from "./Input";

const ListItem = (props) => {
  const listCtx = useContext(ListStore)
  const deleteHandler = () => {
    listCtx.taskDeleteHandler(props.id)
  }

  return (
    <div className="listItem">
      <Modal>
        <form className="editTaskForm">
          <Input id="editInp" label="Edit Task:" />
          <button><FontAwesomeIcon icon={faFloppyDisk} /></button>
        </form>
      </Modal>
      <li>
        {props.value}
      </li>
      <div>
        <button className="editBtn"><FontAwesomeIcon icon={faPen} /></button>
        <button className="deleteBtn" onClick={deleteHandler}><FontAwesomeIcon icon={faTrashCan} /></button>
      </div>
    </div>
  )
}

export default ListItem;