import React, { useState } from "react";
import { Pagination, Table } from "@mantine/core";
import Detail from "./Modal/Detail";
import { Subscription } from "../../types";
import { List } from "./List";

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
  setchanged: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Lists = (props: Props) => {
  const [opened, setOpened] = useState<{
    open: boolean;
    subscription: Subscription | null;
  }>({
    open: false,
    subscription: null,
  });

  const rows = props.subscriptions.map((subscription) => {
    return (
      <List
        key={subscription.id}
        subscription={subscription}
        subscriptions={props.subscriptions}
        setOpened={setOpened}
        setSubscriptions={props.setSubscriptions}
      />
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
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {opened.subscription && (
          <Detail
            subscription={opened.subscription}
            opened={opened.open}
            setOpened={setOpened}
            setchanged={props.setchanged}
          />
        )}
        <Pagination
          page={props.activePage}
          onChange={props.setPage}
          total={props.totalPages}
          className="justify-center my-10"
        />
      </div>
    </>
  );
};

export default Lists;
