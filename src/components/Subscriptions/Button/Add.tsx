import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import { AuthContext } from "../../../utils/auth/authProvider";
import { postSubscriptions } from "../../../api/subscriptions";
import { RowData } from "../../Content";
import { Subscription } from "../../../types";

const Add = ({ data, setData }: {
  data: RowData[],
  setData: React.Dispatch<React.SetStateAction<RowData[]>>
}) => {
  const [opened, setOpened] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      name: "",
      contractAt: "",
      price: 0,
    },
  });

  const addSubscription = async (
    name: string,
    price: number,
    contractAt: string | null
  ) => {
    const subscription: Subscription = await postSubscriptions(name, price, contractAt, 45)
    const newData = [
      ...data,
      { id: subscription.id, name: name, price: price, contractAt: contractAt }
    ]
    setData(newData)
    setOpened(false)
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="サブスクリプションを登録する"
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
              addSubscription(values.name, values.price, values.contractAt);
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

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          color="yellow"
          radius="xl"
          size="xl"
        >
          Add
        </Button>
      </Group>
    </div>
  );
};

export default Add;