import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import { useCurrentUser } from "../hooks/useCurrentUser";
import styles from "../styles/Home.module.css";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();

  if(isAuthChecking) return (<Loader />);

  if(!currentUser) {
    router.push("/signin")
  };

  return (
    <div className={styles.Home}>
      <Sidebar />
      <Content />
    </div>
  );
}
