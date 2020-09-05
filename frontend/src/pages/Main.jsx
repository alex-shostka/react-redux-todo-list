import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {outLogUser, getUserBD} from "../reduxStore/actions"
import { useSelector, useDispatch } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import TodoList from "./Todo-list";
import Header from "./Header";

const Main = () => {
  const username = useSelector((state) => state.username);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(getUserBD())
  };

  useEffect(() => {
    getUser();
  }, []);

  const logOutHandler = async () => {
    dispatch(outLogUser());
  };

  return (
    <>
    <Header username={username} auth={auth} logOutHandler={logOutHandler}/>
    <main>
      {auth ? (
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/todo-list" component={TodoList} />
        </>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </main>
    </>
  );
};

export default Main;
