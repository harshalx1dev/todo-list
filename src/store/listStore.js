import React from "react"

const ListStore = React.createContext({
  users: [{}],
  currentUser: '',
  listItems: [],
  // isLoggedIn: false,
  // loginUser: '',
  // setLoginState: () => {},
  // setUserState: () => {},
  setUserList: () => {},
  taskDeleteHandler: () => {},
  taskEditHandler: () => {},
  modalHandler: () => {}
})

export default ListStore;