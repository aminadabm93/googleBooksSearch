import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Book Search
      </a>
      <a className="navbar-brand" href="/favorites">
        React Book Favorites 
      </a>
    </nav>
  );
}

export default Nav;
