import React from "react";
import { Link } from "react-router-dom";
import '../scripts/script'

const Header = ({ username, auth, logOutHandler }) => {
          //TODO: редкатировать буквы: добавить отсупы и уменьшить растояние между кнопками

  return (
    <nav>
      <div id="marker"></div>
      <Link className="a" to="/">Home</Link>
      {username && auth ? (
        <>
          <Link className="a" to="/todo-list">{username}</Link>
          <Link className='a' onClick={logOutHandler}>logout</Link>
        </>
      ) : (
        <>
          <Link className="a" to="/login">Login</Link>
          <Link className="a" to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Header;
