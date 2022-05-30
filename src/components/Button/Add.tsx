import React, { useState } from "react";
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

const Add = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      contractAt: "",
      price: 0,
    },
  });

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="サブスクリプションを登録する"
        size="lg"
        classNames={{header: "justify-center relative", title: 'text-xl', close: 'absolute right-3',}}
      >
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
