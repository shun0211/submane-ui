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
import { Calendar } from "@mantine/dates";
import { AuthContext } from "../../../hooks/authProvider";
import { postSubscriptions } from "../../../api/subscriptions";
import { RowData } from "../../Content";
import { Subscription } from "../../../types";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Axios from "axios";

const Add = ({
  data,
  setData,
}: {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
}) => {
  const [opened, setOpened] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [dateInput, setDateInput] = useState<Date | null>(new Date());

  const form = useForm({
    initialValues: {
      name: "",
      price: 0,
    },
  });

  const addSubscription = async (
    name: string,
    price: number,
    contractAt: string | null
  ) => {
    try {
      const res = await postSubscriptions(
        name,
        price,
        contractAt,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentUser!.id
      );
      const subscription: Subscription = res.data;
      const newData = [
        ...data,
        {
          id: subscription.id,
          name: subscription.name,
          price: subscription.price,
          contractAt: subscription.contractAt,
        },
      ];
      setData(newData);
      setOpened(false);
      form.reset();
      toast.success("作成しました！", {
        autoClose: 3000,
      });
    } catch (e) {
      if (Axios.isAxiosError(e) && e.response?.status === 400 && Array.isArray(e.response.data)) {
        e.response.data.map((message: string) => toast.error(message))
      }
    }
  };

  const formatDateInput = (dateInput: Date): string => {
    return dayjs(dateInput).format('YYYY-MM-DD')
  }

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
              addSubscription(values.name, values.price, dateInput ? formatDateInput(dateInput) : null);
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

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          color="yellow"
          radius="xl"
          size="xl"
        >
          登録
        </Button>
      </Group>
    </div>
  );
};

export default Add;
