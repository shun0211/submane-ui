import React, { useContext, useEffect, useState } from "react";
import Add from "./Subscriptions/Button/Add";
import Header from "./Header";
import Lists from "./Subscriptions/Lists";
import { getSubscriptions } from "../api/subscriptions";
import { AuthContext } from "../hooks/authProvider";
import { Subscription } from "../types";
import { GetSubscriptions } from "../types/api";

function Content() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [changed, setchanged] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const inner = async () => {
      if (currentUser) {
        const res: GetSubscriptions = await getSubscriptions(currentUser.id, activePage);
        setSubscriptions(res.subscriptions);
        setTotalPages(res.page.totalPages);
        setPage(res.page.page);
      }
    };
    inner();
  }, []);

  useEffect(() => {
    const inner = async () => {
      if (currentUser) {
        const res: GetSubscriptions = await getSubscriptions(currentUser.id, activePage);
        setSubscriptions(res.subscriptions);
        setTotalPages(res.page.totalPages);
        setPage(res.page.page);
        setchanged(false);
      }
    };
    inner();
  }, [changed, activePage]);

  return (
    <div className="w-full">
      <Header />
      <Add subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
      <Lists
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
        setchanged={setchanged}
        activePage={activePage}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Content;
