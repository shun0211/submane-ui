import React, { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
} from "@mantine/core";
import axios from "axios";

type RowData = {
  name: string;
  price: string;
  contractAt: string;
};

export default function Lists() {
  const [data, setData] = useState<RowData[]>([]);

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
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <th>
              サブスク名
            </th>
            <th>
              月額料金
            </th>
            <th>
              契約日
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
