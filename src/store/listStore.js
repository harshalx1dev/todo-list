import React from "react"

const ListStore = React.createContext({
  listItems: [],
  taskDeleteHandler: () => {},
})

export default ListStore;