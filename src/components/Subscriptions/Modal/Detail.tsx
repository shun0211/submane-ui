import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { putSubscriptionsSubscriptionId } from "../../../api/subscriptions";
import { Subscription } from "../../../types";

const Detail = ({
  subscription,
  opened,
  setOpened,
  setchanged,
}: {
  subscription: Subscription;
  opened: boolean;
  setOpened: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      subscription: Subscription | null;
    }>
  >;
  setchanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm({
    initialValues: {
      name: subscription.name,
      price: subscription.price,
    },
  });
  const [dateInput, setDateInput] = useState<Date | null>(new Date());

  const updateSubscription = async (
    id: number,
    name: string,
    price: number,
    contractAt: string | null
  ) => {
    try {
      await putSubscriptionsSubscriptionId(
        id,
        name,
        price,
        contractAt
      );
      setOpened({
        open: false,
        subscription: null,
      });
      setchanged(true);
    } catch {
      toast.error("予期せぬエラーが発生しました。")
    }
  };

  // HACK: 共通化できそうなのでやる
  const formatDateInput = (dateInput: Date): string => {
    return dayjs(dateInput).format('YYYY-MM-DD')
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() =>
          setOpened({
            open: false,
            subscription: null,
          })
        }
        title={subscription.name}
        size="lg"
        classNames={{
          header: "justify-center relative",
          title: "text-xl",
          close: "absolute right-3",
        }}
      >
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              updateSubscription(
                subscription.id,
                values.name,
                values.price,
                dateInput ? formatDateInput(dateInput) : null,
              );
            })}
          >
            <TextInput
              required
              data-autofocus
              label="サブスクリプション名"
              placeholder="Amazon Prime"
              {...form.getInputProps("name")}
            />
            <NumberInput
              mt="sm"
              required
              label="月額料金"
              placeholder="1000"
              {...form.getInputProps("price")}
            />
            <span>契約日</span>
            <Calendar value={dateInput} onChange={setDateInput} />;
            <Group position="right" mt="md">
              <Button type="submit">登録</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Detail;
