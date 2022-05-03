import Image from "next/image";
import React from "react";
import styles from "../styles/Sidebar.module.css";

function SidebarIcon() {
  return (
    <div className={styles.SidebarIcon}>
      <Image
        src="/icon_dammy.png"
        alt="My icon"
        width={100}
        height={100}
        className={styles.SidebarIcon}
      />
      <p className={styles.email}>test@example.com</p>
    </div>
  );
}

export default SidebarIcon;
