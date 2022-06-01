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
import { AuthContext } from "../../utils/auth/authProvider";
import axios from "axios";

const Add = ({ data, setData }) => {
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
    console.log(currentUser?.id);
    await axios
      .post("http://localhost:1323/subscriptions", {
        name: name,
        price: price,
        userId: 45,
      })
      .then((res) => {
        const newData = [
          ...data,
          { id: res.data.id, name: name, price: price, contractAt: contractAt },
        ];
        setData(newData);
        setOpened(false);
      })
      .catch((error) => console.log(error));
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
