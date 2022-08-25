import React, { useEffect, useState } from "react";
import ListStore from "./store/listStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './App.css'
import Input from "./components/Input";
import List from "./components/List";

const App = () => {
  const [inpValue, setInpValue] = useState('');
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || listItems;
    setListItems(tasks)
  }, [])

  const setLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const taskInpHandler = (event) => {
    setInpValue(event.target.value)
  }

  const taskSubmitHandler = (event) => {
    event.preventDefault();
    setListItems((prevState) => {
      setLocalStorage([...prevState, inpValue])
      return [...prevState, inpValue];
    })
    setInpValue('')
  }

  const taskDeleteHandler = (id) => {
    setListItems((prevState) => {
      prevState.splice(id, 1)
      setLocalStorage([...prevState])
      return [...prevState];
    })
  }

  return (
    <ListStore.Provider value={{ listItems: listItems, taskDeleteHandler: taskDeleteHandler }}>
      <h1>TODO List</h1>
      <form className="taskForm" onSubmit={taskSubmitHandler}>
        <Input value={inpValue} onChange={taskInpHandler} id="itemInp" label="Task" />
        <button type="submit"><FontAwesomeIcon icon={faPlus} className="addIcon" /></button>
      </form>
      <List />
    </ListStore.Provider>
  )
}

export default App;