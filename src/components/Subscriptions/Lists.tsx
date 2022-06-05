import React, { useState } from "react";
import { Table } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { RowData } from "../Content";
import Detail from "./Modal/Detail";
import { Subscription } from "../../types";
import { deleteSubscriptionsSubscriptionId } from "../../api/subscriptions";
import { toast } from "react-toastify";

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
    try {
      await deleteSubscriptionsSubscriptionId(id);
      const newData = data.filter((el) => el.id !== id);
      setData(newData);
      toast.success("削除しました!", {
        autoClose: 3000,
      });
    } catch {
      toast.error("予期せぬエラーが発生しました😱", {
        autoClose: 3000,
      });
    }
  };

  const rows = data.map((data) => {
    return (
      <>
        <tr onClick={() => setOpened({ open: true, subscription: data })}>
          <td>{data.name}</td>
          <td>{data.price}</td>
          <td>{data.contractAt}</td>
          <td>
            <Trash
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("本当に削除しますか？")) {
                  removeSubscription(data.id);
                }
              }}
            />
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div className="m-10">
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: "fixed", minWidth: 700 }}
          highlightOnHover={true}
          className="cursor-pointer"
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
      </div>
    </>
  );
};

export default Lists;
