import React, { useState } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import { Trash } from "tabler-icons-react";
import { RowData } from "../Content";
import { NextPage } from "next";
import Detail from "./Modal/Detail";
import { Subscription } from "../../types";

type Props = {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
};

const Lists: NextPage<Props> = ({ data, setData, setChange }) => {
  const [opened, setOpened] = useState<{ open: boolean, subscription: Subscription | null}>({
    open: false,
    subscription: null,
  });

  const handleRemoveSubscription = (id: number) => {
    axios
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
      <>
        <tr onClick={() => setOpened({ open: true, subscription: row })}>
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
      </>
    );
  });

  return (
    <>
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
      {opened.subscription && (
        <Detail
          subscription={opened.subscription}
          opened={opened.open}
          setOpened={setOpened}
          setChange={setChange}
        />
      )}
    </>
  );
};

export default Lists;
