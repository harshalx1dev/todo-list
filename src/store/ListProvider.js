import React, { useState, useReducer, useEffect } from "react";
import ListStore from "./listStore";

const listReducer = (state, action) => {
  if (action.type === 'DEFAULT') {
    return action.payload.newUsers[0][action.payload.currentUser]?.listItems || []
  }

  if (action.type === 'ADD') {
    return [...state, action.value];
  }

  if (action.type === 'EDIT') {
    state[action.payload.id] = action.payload.value;
    return [...state];
  }

  if (action.type === 'DELETE') {
    state.splice(action.id, 1)
    return [...state];
  }
}

const ListProvider = (props) => {
  const [users, setUsers] = useState([{}])
  const [listItems, dispatchListItems] = useReducer(listReducer, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const newUsers = JSON.parse(localStorage.getItem('users')) || users;
    setUsers(newUsers)
    dispatchListItems({ type: 'DEFAULT', payload: { newUsers, currentUser } })
  }, [currentUser])

  const setLoginState = (bool) => {
    setIsLoggedIn(bool)
  } 

  const setUserState = (username) => {
    setCurrentUser(username)
    const userExist = users[0].hasOwnProperty(username)
    if(!userExist) {
      setUsers((prevState) => {
        prevState[0][username] = listItems;
        return [...prevState];
      })
    }
  }

  const setUserList = (list) => {
    setUsers((prevState) => {
      prevState[0][currentUser] = { listItems: list };
      console.log(prevState);
      setLocalStorage([...prevState])
      return [...prevState]
    })
  }

  const taskEditHandler = (id, value) => {
    if (value.trim() === '') return;
  
    dispatchListItems({ type: 'EDIT', payload: { id, value } })
  }
  
  const taskDeleteHandler = (id) => {
    // flushSync(() => {
      dispatchListItems({ type: 'DELETE', id: id })
    // })
  }

  return (
    <ListStore.Provider value={{ users, listItems, isLoggedIn, loginUser: currentUser, taskDeleteHandler, taskEditHandler, setUserList, setLoginState, setUserState }}>
      {props.children}
    </ListStore.Provider>
  )
}

export default ListProvider; 