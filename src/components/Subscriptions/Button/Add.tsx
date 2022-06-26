import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Group,
  InputWrapper,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Calendar } from "@mantine/dates";
import { AuthContext } from "../../../hooks/authProvider";
import { postSubscriptions } from "../../../api/subscriptions";
import { Subscription } from "../../../types";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { BadRequestError } from "../../../utils/custom_error";

const Add = ({
  subscriptions,
  setSubscriptions,
}: {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
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
    contractedAt: string | null
  ) => {
    const createdSubscription = await postSubscriptions(
      name,
      price,
      contractedAt,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      currentUser!.id
    ).catch((e) => {
      if (e instanceof BadRequestError) {
        e.errorMessages.map((message: string) => toast.error(message));
      }
      throw e;
    });
    const newSubscriptions = [
      ...subscriptions,
      {
        id: createdSubscription.id,
        name: createdSubscription.name,
        price: createdSubscription.price,
        contractedAt: createdSubscription.contractedAt,
      },
    ];
    setSubscriptions(newSubscriptions);
    setOpened(false);
    form.reset();
    toast.success("作成しました！", {
      autoClose: 3000,
    });
  };

  const formatDateInput = (dateInput: Date): string => {
    return dayjs(dateInput).format("YYYY-MM-DD");
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
              addSubscription(
                values.name,
                values.price,
                dateInput ? formatDateInput(dateInput) : null
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
            <InputWrapper label="契約日" className="mt-2">
              <Calendar value={dateInput} onChange={setDateInput} fullWidth />
            </InputWrapper>
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
