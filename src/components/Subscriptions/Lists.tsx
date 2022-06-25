import React, { useState } from "react";
import { Pagination, Table } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import Detail from "./Modal/Detail";
import { Subscription } from "../../types";
import { deleteSubscriptionsSubscriptionId } from "../../api/subscriptions";
import { toast } from "react-toastify";

const Lists = ({
  subscriptions,
  setSubscriptions,
  setchanged,
  activePage,
  setPage,
  totalPages,
}: {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
  setchanged: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
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
      const newSubscriptions = subscriptions.filter((el) => el.id !== id);
      setSubscriptions(newSubscriptions);
      toast.success("削除しました!", {
        autoClose: 3000,
      });
    } catch {
      toast.error("予期せぬエラーが発生しました😱", {
        autoClose: 3000,
      });
    }
  };

  const rows = subscriptions.map((subscription) => {
    return (
      <>
        <tr
          onClick={() => setOpened({ open: true, subscription: subscription })}
        >
          <td>{subscription.name}</td>
          <td>{subscription.price}</td>
          <td>{subscription.contractAt}</td>
          <td>
            <Trash
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("本当に削除しますか？")) {
                  removeSubscription(subscription.id);
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
        <Pagination
          page={activePage}
          onChange={setPage}
          total={totalPages}
          className="justify-center my-10"
        />
      </div>
    </>
  );
};

export default Lists;
