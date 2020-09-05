import React from "react";

function TodoItem({ todo, delTODOHandle, doneTODOHandle }) {
  const classes = [];
  // if (todo.done) {
  //   classes.push("done");
  // }
  
  return (
    <>
      <label className="label1">
      {/* <span className={classes.join(" ")}> */}
        <input type="checkbox" defaultChecked={todo.done} onClick={() => doneTODOHandle(todo._id, 'done')}/>
        <i></i>
        <span>{todo.task}</span>
        {/* <button onClick={() => delTODOHandle(todo._id)}>&times;</button> */}
      {/* </span> */}
      </label>
</>
  );
}

export default TodoItem;
