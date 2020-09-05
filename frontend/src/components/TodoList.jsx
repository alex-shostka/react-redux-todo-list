import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { delTODO_BD, doneTODO, getTasks } from "../reduxStore/actions";
import AddTodo from "./AddTodo";

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const delTODOHandle = (id) => {
    dispatch(delTODO_BD(id));
  };

  const doneTODOHandle = (id, done) => {
    dispatch(doneTODO(id, done));
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    //TODO: выровнять боковые стороны. Убрать верхнюю полоску
    <div className="component">
      <div className="list">
        <h2>
          <AddTodo />
        </h2>
        {todos &&
          todos.map((todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo._id}
                delTODOHandle={delTODOHandle}
                doneTODOHandle={doneTODOHandle}
              />
            );
          })}
      </div>
    </div>
  );
}

export default TodoList;
