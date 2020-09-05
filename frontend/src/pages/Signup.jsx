import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { signupUser } from "../reduxStore/actions";
import { useDispatch } from "react-redux";

const Signup = ({ history }) => {
  const [value, setValue] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(signupUser(value.username, value.password, history));
  };

  const onChangeHandler = (event) => {
    // получить данные из форм
    const {
      target: { name, value },
    } = event;
    setValue((currentState) => {
      return { ...currentState, [name]: value };
    });
  };

  return (
    <div className='form'>
      <form onSubmit={onSubmitHandler}>
        <h2>registration</h2>
        <div className="input">
          <div className="inputBox">
            <label>Please, enter your name</label>
            <input onChange={onChangeHandler} id="inp1" placeholder="Name" name="username" type="text" value={value.username}/>
          </div>
          <div className="inputBox">
            <label>Please, enter your password</label>
            <input onChange={onChangeHandler} id="inp1" placeholder="Password" name="password" type="password" value={value.password}/>
          </div>
          <div className="inputBox">
            <button id="btn1" type="submit">Signup</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Signup);
