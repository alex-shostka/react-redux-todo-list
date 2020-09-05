import React, { useState } from "react";
import { addTaskToDB } from "../reduxStore/actions";
import { useDispatch } from "react-redux";

function AddTodo() {
  const dispatch = useDispatch();
  const [values, setValue] = useState({ task: "" });
  const onChangeHandler = (event) => {
    setValue({ task: event.target.value });
  };

  // запись в store, чтобы не перезагружалась страница
  const submitHandler = (event) => {
    event.preventDefault();
    const { task: value } = values;
    dispatch(addTaskToDB(value));
    setValue({ task: "" });
  };

  return (
    <div className="component container">
      <form onSubmit={submitHandler}>
        <div className="inputField">
          <input onChange={onChangeHandler} type="text" name="inputValue" value={values.task} />
          <label className="addLabel">All you need is ... task</label>
          <span className="span2"></span>
        </div>
        <button className="btn3" type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTodo;
