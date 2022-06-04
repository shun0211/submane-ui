import React, { useState } from "react";
import { Table } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { RowData } from "../Content";
import Detail from "./Modal/Detail";
import { Subscription } from "../../types";
import { deleteSubscriptionsSubscriptionId } from "../../api/subscriptions";

const Lists = ({
  data,
  setData,
  setchanged,
}: {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
  setchanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [opened, setOpened] = useState<{
    open: boolean;
    subscription: Subscription | null;
  }>({
    open: false,
    subscription: null,
  });

  const removeSubscription = async (id: number) => {
    await deleteSubscriptionsSubscriptionId(id);
    const newData = data.filter((el) => el.id !== id);
    setData(newData);
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
              onClick={(e) => {
                e.stopPropagation();
                removeSubscription(row.id);
              }}
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
          setchanged={setchanged}
        />
      )}
    </>
  );
};

export default Lists;
