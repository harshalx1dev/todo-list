import React, { Fragment, useEffect, useState, useReducer } from "react";
import { flushSync } from "react-dom";
import ListStore from "./store/listStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './App.css'
import Input from "./components/UI/Input/Input";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LoginStore from "./store/loginStore";
// import ListProvider from "./store/ListProvider";

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

const App = () => {
  const [regiState, setRegiState] = useState(true)
  const [users, setUsers] = useState([{}])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('')
  const [inpValue, setInpValue] = useState('');
  const [listItems, dispatchListItems] = useReducer(listReducer, []);

  useEffect(() => {
    const newUsers = JSON.parse(localStorage.getItem('users')) || users;
    setUsers(newUsers)
    dispatchListItems({ type: 'DEFAULT', payload: { newUsers, currentUser } })
  }, [currentUser])

  const regiStateHandler = () => {
    setRegiState((prevState) => {
      return !prevState;
    })
  }

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

  const setLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
  }

  const setUserList = (list) => {
    setUsers((prevState) => {
      prevState[0][currentUser] = { listItems: list };
      console.log(prevState);
      setLocalStorage([...prevState])
      return [...prevState]
    })
  }

  const taskInpHandler = (event) => {
    setInpValue(event.target.value)
  }

  const taskSubmitHandler = (event) => {
    event.preventDefault();

    if (inpValue.trim() === '') return;  

    dispatchListItems({ type: 'ADD', value: inpValue })

    setInpValue('')
  }

  const taskEditHandler = (id, value) => {
    if (value.trim() === '') return;

    dispatchListItems({ type: 'EDIT', payload: { id, value } })
  }

  const taskDeleteHandler = (id) => {
    flushSync(() => {
      dispatchListItems({ type: 'DELETE', id: id })
    })
  }

  return (
    <LoginStore.Provider value={{ isLoggedIn, loginUser: currentUser, setLoginState, setUserState }}>
      {/* <ListProvider> */}
      <ListStore.Provider value={{ users, listItems, taskDeleteHandler, taskEditHandler, setUserList }}>
        <header>
          <h1>ToDo List App</h1>
          {!isLoggedIn ? <button className="optionBtn" onClick={regiStateHandler}>{regiState ? 'SWITCH TO LOGIN' : 'SWITCH TO REGISTER'}</button> : <button className="optionBtn" onClick={() => { setLoginState(false) }}>LOGOUT</button>}
        </header>
        {isLoggedIn ? <Fragment>
          <form className="taskForm" onSubmit={taskSubmitHandler}>
            <Input type="text" value={inpValue} onChange={taskInpHandler} id="itemInp" label="Task" />
            <button type="submit"><FontAwesomeIcon icon={faPlus} className="addIcon" /></button>
          </form>
          <List />
        </Fragment> : <Fragment>{regiState ? <Register /> : <Login />}</Fragment>}
      </ListStore.Provider>
      {/* </ListProvider> */}
    </LoginStore.Provider>
  )
}

export default App;