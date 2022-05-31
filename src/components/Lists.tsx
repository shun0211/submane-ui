import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import { Trash } from "tabler-icons-react";

type RowData = {
  id: number;
  name: string;
  price: string;
  contractAt: string;
};

export default function Lists() {
  const [data, setData] = useState<RowData[]>([]);
  const handleRemoveSubscription = async (id: number) => {
    const res: any = await axios
      .delete(`http://localhost:1323/subscriptions/${id}`)
      .then(() => {
        const newData = [...data]
        newData.splice(id, 1)
        setData(newData)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:1323/subscriptions")
      .then((response: any) => response.data)
      .then(setData)
      .catch(console.error);
  }, []);

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.price}</td>
      <td>{row.contractAt}</td>
      <td>
        <Trash className="h-5 w-5" onClick={() => handleRemoveSubscription(row.id)} />
      </td>
    </tr>
  ));

  return (
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <th>サブスク名</th>
            <th>月額料金</th>
            <th>契約日</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
  );
}
