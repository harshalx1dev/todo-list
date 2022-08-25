import React, { useContext } from "react";
import ListStore from "../store/listStore";
import './List.css'
import ListItem from "./ListItem";

const List = () => {
  const listCtx = useContext(ListStore)
  return (
    <ul className="list">
      {listCtx.listItems.map((item, index) => <ListItem id={index} key={index} value={item} />)}
    </ul>
  )
}

export default List;