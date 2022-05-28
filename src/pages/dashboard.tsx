import React from "react";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";

export default function Dashboard() {
  return (
    <div className={styles.Home}>
      <Sidebar />
      <Content />
    </div>
  );
}