import React from "react"

const ListStore = React.createContext({
  listItems: [],
  taskDeleteHandler: () => {},
  taskEditHandler: () => {},
  modalHandler: () => {}
})

export default ListStore;