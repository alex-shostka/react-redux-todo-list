import React from "react";
import { Provider } from "react-redux";
import store from "./reduxStore/store";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
