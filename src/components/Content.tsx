import { Container } from "@mantine/core";
import React from "react";
import Header from "./Header";

function Content() {
  return (
    <div className="w-full">
      <Header />
      <Container></Container>
    </div>
  );
}

export default Content;
