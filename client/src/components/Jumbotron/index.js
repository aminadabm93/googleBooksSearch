import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 80, clear: "both", paddingBottom:10,paddingTop:20, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
