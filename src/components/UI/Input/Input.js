import React from "react";
import './Input.css'

const Input = (props) => {
  return (
    <div className={`inpComp ${props.className}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} value={props.value} onChange={props.onChange} autoComplete="off" />
    </div>
  )
}

export default Input;