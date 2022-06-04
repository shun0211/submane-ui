import Image from "next/image";
import React, { useContext } from "react";
import styles from "../styles/Sidebar.module.css";
import { AuthContext } from "../hooks/authProvider";

const SidebarIcon = () => {
  const auth = useContext(AuthContext)

  return (
    <div className={styles.SidebarIcon}>
      <Image
        src="/icon_dammy.png"
        alt="My icon"
        width={100}
        height={100}
        className={styles.SidebarIcon}
      />
      <p className={styles.email}>{auth.currentUser?.email}</p>
    </div>
  );
}

export default SidebarIcon;
