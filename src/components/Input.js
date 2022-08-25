import React from "react";
import './Input.css'

const Input = (props) => {
  return (
    <div className="inpComp">
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} value={props.value} onChange={props.onChange} autoComplete="off" />
    </div>
  )
}

export default Input;