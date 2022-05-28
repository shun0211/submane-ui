import {
  Box,
  Button,
  Container,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";

const Signin = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleEmailAndPasswordSignin = async (
    email: string,
    password: string
  ) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const currentUser = userCredential.user;
    const token = await currentUser.getIdToken(true)
    const res = await axios.post(
      "http://localhost:1323/login",
      { email: email, uid: currentUser.uid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((error) => console.log(error))
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-sky-200">
      <Space className="h-10" />
      <Container size="xs" px="xs" className="p-10 bg-white">
        <Title order={3} className="text-center">
          ログイン
        </Title>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              handleEmailAndPasswordSignin(values.email, values.password);
            })}
          >
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

            <Group position="right" mt="md">
              <Button type="submit" className="bg-sky-500/100">
                ログイン
              </Button>
            </Group>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Signin;
