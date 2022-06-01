import React from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import { Trash } from "tabler-icons-react";
import { RowData } from "./Content";
import { NextPage } from "next";
import Link from "next/link";

type Props = {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
};

const Lists: NextPage<Props> = ({ data, setData }) => {
  const handleRemoveSubscription = async (id: number) => {
    await axios
      .delete(`http://localhost:1323/subscriptions/${id}`)
      .then(() => {
        const newData = [...data];
        newData.splice(id, 1);
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const rows = data.map((row) => {
    return (
      <Link key={row.id} href={`/subscriptions/${row.id}`}>
        <tr>
          <td>{row.name}</td>
          <td>{row.price}</td>
          <td>{row.contractAt}</td>
          <td>
            <Trash
              className="h-5 w-5"
              onClick={() => handleRemoveSubscription(row.id)}
            />
          </td>
        </tr>
      </Link>
    );
  });

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
};

export default Lists;
