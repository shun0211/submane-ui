import React, { useContext, useEffect, useState } from "react";
import Add from "./Subscriptions/Button/Add";
import Header from "./Header";
import Lists from "./Subscriptions/Lists";
import { getSubscriptions } from "../api/subscriptions";
import { AuthContext } from "../hooks/authProvider";

export type RowData = {
  id: number;
  name: string;
  price: number;
  contractAt: string | null;
};


function Content() {
  const [data, setData] = useState<RowData[]>([]);
  const [changed, setchanged] = useState(false);
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const inner = async () => {
      if (currentUser) {
        const res = await getSubscriptions(currentUser.id);
        setData(res.data);
      };
    }
    inner();
  }, []);

  useEffect(() => {
    if (changed === true) {
      const inner = async () => {
        if (currentUser) {
          const res = await getSubscriptions(currentUser.id);
          setData(res.data);
          setchanged(false);
        }
      };
      inner();
    }
  }, [changed]);

  return (
    <div className="w-full">
      <Header />
      <Add data={data} setData={setData} />
      <Lists data={data} setData={setData} setchanged={setchanged} />
    </div>
  );
}

export default Content;
