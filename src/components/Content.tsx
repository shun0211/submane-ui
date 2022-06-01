import axios from "axios";
import React, { useEffect, useState } from "react";
import Add from "./Button/Add";
import Header from "./Header";
import Lists from "./Lists";

export type RowData = {
  id: number;
  name: string;
  price: number;
  contractAt: string;
};

function Content() {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:1323/subscriptions")
      .then((response: any) => response.data)
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Add data={data} setData={setData} />
      <Lists data={data} setData={setData} />
    </div>
  );
}

export default Content;
