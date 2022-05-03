/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { SidebarData } from "./SidebarData";
import styles from "../styles/Sidebar.module.css";
import { useRouter } from "next/router";
import SidebarIcon from "./SidebarIcon";

function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.Sidebar}>
      <SidebarIcon />
      <ul className={styles.SidebarList}>
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              className={
                styles.row +
                " " +
                `${router.pathname == value.link ? `${styles.active}` : ""}`
              }
              onClick={() => {
                router.push(value.link);
              }}
            >
              <div className={styles.icon}>{value.icon}</div>
              <div className={styles.title}>{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
