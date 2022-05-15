import {
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";

function Signup() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      termsOfService: false,
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  return (
    <div className="min-h-screen bg-sky-200">
      <Space className="h-10" />
      <Container size="xs" px="xs" className="p-10 bg-white">
        <Title order={3} className="text-center">
          会員登録
        </Title>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              required
              label="メールアドレス"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <TextInput
              required
              label="パスワード"
              placeholder="password"
              {...form.getInputProps("password")}
            />

            <TextInput
              required
              label="パスワード確認"
              placeholder="password"
              {...form.getInputProps("passwordConfirmation")}
            />

            <Checkbox
              mt="md"
              label="利用規約に同意します"
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />

            <Group position="right" mt="md">
              <Button type="submit" className="bg-sky-500/100">
                登録
              </Button>
            </Group>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Signup;
