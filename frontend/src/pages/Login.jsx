import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginUser} from "../reduxStore/actions";

const Login = ({ history }) => {
  const [ value, setValue ] = useState({username: '', password: ''});
  const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(loginUser(value.username, value.password, history));
  };

  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    setValue((currentState) => {
      return { ...currentState, [name]: value };
    });
  };

  return (
    <div className='form'>
      <form noValidate onSubmit={onSubmitHandler}>
      <h2>Open your list</h2>
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
            <button id="btn1" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
