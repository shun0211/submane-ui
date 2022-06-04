import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Add from "./Subscriptions/Button/Add";
import Header from "./Header";
import Lists from "./Subscriptions/Lists";
import { getSubscriptions } from "../api/subscriptions";
import { async } from "@firebase/util";

export type RowData = {
  id: number;
  name: string;
  price: number;
  contractAt: string;
};

function Content() {
  const [data, setData] = useState<RowData[]>([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const inner = async () => {
      const data = await getSubscriptions();
      setData(data);
    };
    inner();
  }, []);

  useEffect(() => {
    if (change === true) {
      const inner = async () => {
        const data = await getSubscriptions();
        setData(data);
        setChange(false);
      };
      inner();
    }
  }, [change]);

  return (
    <div className="w-full">
      <Header />
      <Add data={data} setData={setData} />
      <Lists data={data} setData={setData} setChange={setChange} />
    </div>
  );
}

export default Content;
