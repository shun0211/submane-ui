import React from "react";
import { toast } from "react-toastify";
import { Trash } from "tabler-icons-react";
import { deleteSubscriptionsSubscriptionId } from "../../api/subscriptions";
import { Subscription } from "../../types";

type Props = {
  subscription: Subscription;
  subscriptions: Subscription[];
  setOpened: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      subscription: Subscription | null;
    }>
  >;
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

export const List = (props: Props) => {
  const removeSubscription = async (id: number) => {
    try {
      await deleteSubscriptionsSubscriptionId(id);
      const newSubscriptions = props.subscriptions.filter((el) => el.id !== id);
      props.setSubscriptions(newSubscriptions);
      toast.success("削除しました!", {
        autoClose: 3000,
      });
    } catch {
      toast.error("予期せぬエラーが発生しました😱", {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <tr
        onClick={() =>
          props.setOpened({ open: true, subscription: props.subscription })
        }
      >
        <td>{props.subscription.name}</td>
        <td>{props.subscription.price}</td>
        <td>{props.subscription.contractAt}</td>
        <td className="relative">
          <Trash
            className="h-5 w-5 absolute left-0 top-0 bottom-0 m-auto"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("本当に削除しますか？")) {
                removeSubscription(props.subscription.id);
              }
            }}
          />
        </td>
      </tr>
    </>
  );
};
