import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import React from "react";
import { putSubscriptionsSubscriptionId } from "../../../api/subscriptions";
import { Subscription } from "../../../types";

const Detail = ({
  subscription,
  opened,
  setOpened,
  setChange,
}: {
  subscription: Subscription;
  opened: boolean;
  setOpened: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      subscription: Subscription | null;
    }>
  >;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm({
    initialValues: {
      name: subscription.name,
      price: subscription.price,
      contractAt: subscription.contractAt,
    },
  });

  const updateSubscription = async (
    id: number,
    name: string,
    price: number,
    contractAt: string
  ) => {
    const subscription = await putSubscriptionsSubscriptionId(
      id,
      name,
      price,
      contractAt
    );
    setOpened({
      open: false,
      subscription: null,
    });
    setChange(true);
  };

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
              console.log(values);
              updateSubscription(
                subscription.id,
                values.name,
                values.price,
                values.contractAt
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
            <TimeInput label="契約日" />
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
