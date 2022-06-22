import React, { useContext, useEffect, useState } from "react";
import Add from "./Subscriptions/Button/Add";
import Header from "./Header";
import Lists from "./Subscriptions/Lists";
import { getSubscriptions } from "../api/subscriptions";
import { AuthContext } from "../hooks/authProvider";
import { Subscription } from "../types";

function Content() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [changed, setchanged] = useState(false);
  const { currentUser } = useContext(AuthContext)
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    const inner = async () => {
      if (currentUser) {
        const res = await getSubscriptions(currentUser.id, 1);
        setSubscriptions(res.data.subscriptions);
      };
    }
    inner();
  }, []);

  useEffect(() => {
    if (changed === true) {
      const inner = async () => {
        if (currentUser) {
          const res = await getSubscriptions(currentUser.id, 1);
          setSubscriptions(res.data.subscriptions);
          setchanged(false);
        }
      };
      inner();
    }
  }, [changed]);

  return (
    <div className="w-full">
      <Header />
      <Add subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
      <Lists subscriptions={subscriptions} setSubscriptions={setSubscriptions} setchanged={setchanged} activePage={activePage} setPage={setPage} />
    </div>
  );
}

export default Content;
