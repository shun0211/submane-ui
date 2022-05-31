import React from "react";
import Add from "./Button/Add";
import Header from "./Header";
import Lists from "./Lists";

function Content() {
  return (
    <div className="w-full">
      <Header />
      <Add />
      <Lists />
    </div>
  );
}

export default Content;
