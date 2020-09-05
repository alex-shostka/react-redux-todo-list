import actions from "./types";

export const addTODO = (value) => ({ type: actions.ADD_TODO, value });
export const delTODO = (id) => ({ type: actions.DEL_TODO, id });
export const doneTDOD = (id, done) => ({ type: actions.DONE_TODO, id, done });
export const getTODOBd = (tasks) => ({ type: actions.GET_TODO_BD, tasks });
export const regUser = (username, password) => ({type: actions.REG_USER, username, password});
export const logUser = (username, password) => ({type: actions.LOG_USER, username, password});
export const logoutUser = () => ({ type: actions.LOGOUT });
export const usrData = (auth, username) => ({type: actions.GET_USER, auth, username});

export const getTasks = () => async (dispatch) => {
  const getData = await fetch("http://localhost:3100/todos");
  const { task } = await getData.json();
  const filterTask = task.filter((item) => item.isVisible);
  dispatch(getTODOBd(filterTask));
};

export const addTaskToDB = (task) => async (dispatch) => {
  const data = await fetch("http://localhost:3100/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  const getData = await data.json();
  dispatch(addTODO(getData));
};

export const doneTODO = (id, done) => async (dispatch) => {
  const data = await fetch(`http://localhost:3100/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  });
  const getData = await data.json();
  console.log("getData", getData);
  dispatch(doneTDOD(getData._id, done));
  // не работает зачеркивание при true и не показвает зачеркнутым
  // уже выполненый todo
};

export const delTODO_BD = (id) => async (dispatch) => {
  await fetch(`http://localhost:3100/todos/${id}`, {
    method: "DELETE",
  });
  dispatch(delTODO(id));
};

export const signupUser = (username, password, history) => async (dispatch) => {
  // отправить данные на сервер
  const regUs = await fetch("http://localhost:3100/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const response = await regUs.json();
  const { success } = response;

  dispatch(regUser(username, password));
  if (success) history.push("/login");
};

export const loginUser = (username, password, history) => async (dispatch) => {
  const logUs = await fetch("http://localhost:3100/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  const response = await logUs.json();
  const { successAuth } = response;
  dispatch(logUser(username));
  if (successAuth) history.push("/todo-list");
  // TODO: Сделать - если при логине неверные данные - всплывающее окно или редирект на регистрацию
};

export const outLogUser = () => async (dispatch) => {
  const logOutFetch = await fetch("http://localhost:3100/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  const response = await logOutFetch.json();
  const { deauth } = response;
  if (deauth) dispatch(logoutUser());
};

export const getUserBD = () => async (dispatch) => {
  const userData = await fetch("http://localhost:3100/auth/user", {
    method: "GET",
    credentials: "include",
  });
  const response = await userData.json();
  const { user } = response;
  if (user) {
    dispatch(usrData(true, user.username));
  } else {
    dispatch(usrData(false, user));
  }
};
