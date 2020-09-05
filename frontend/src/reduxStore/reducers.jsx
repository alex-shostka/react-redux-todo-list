import actions from "./types";

const todo = [];
const initState = {
  todos: todo,
  username: "",
  password: "",
  auth: false,
};

export const reducers = (state = initState, action) => {
  switch (action.type) {
    case actions.ADD_TODO :
      const newTask = {
        task: action.value.task,
        isDone: false,
        isVisible: true,
        _id: action.value._id
      };
      return {...state, todos: [...state.todos, newTask]};

    case actions.DEL_TODO :
      return {...state ,todos: state.todos.filter((item) => item._id !== action.id)};

      // не работает. см actions
    case actions.DONE_TODO :
      const newTodos = state.todos.map((todo) => {
        if (todo._id === action.payload) todo.done = !todo.done;
        return todo;
      });
      return { ...state, todos: newTodos };
      
      case actions.GET_TODO_BD:
      return { ...state, todos: action.tasks };

      case actions.REG_USER:
      return {...state, username: action.username, password: action.password };

      case actions.LOG_USER:
      return {...state, username: action.username, auth: true };

      case actions.LOGOUT:
      return {...state, auth: false };

      case actions.GET_USER:
      return {...state, username: action.username, auth: action.auth };

    default:
      return state;
  }
};
