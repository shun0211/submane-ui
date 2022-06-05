import React, { useEffect, useState } from "react";
import Add from "./Subscriptions/Button/Add";
import Header from "./Header";
import Lists from "./Subscriptions/Lists";
import { getSubscriptions } from "../api/subscriptions";

export type RowData = {
  id: number;
  name: string;
  price: number;
  contractAt: string | null;
};

function Content() {
  const [data, setData] = useState<RowData[]>([]);
  const [changed, setchanged] = useState(false);

  useEffect(() => {
    const inner = async () => {
      const res = await getSubscriptions();
      setData(res.data);
    };
    inner();
  }, []);

  useEffect(() => {
    if (changed === true) {
      const inner = async () => {
        const res = await getSubscriptions();
        setData(res.data);
        setchanged(false);
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
