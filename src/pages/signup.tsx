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
import React, { useContext } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import axios from "axios";
import "../utils/firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../utils/auth/authProvider";
import { User } from "../types";

const Signup = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      termsOfService: false,
    },
  });

  // HUCK: ComponentProps<"form">["onSubmit"]がいいみたい
  const handleEmailAndPasswordSignup = async (
    email: string,
    password: string
  ) => {
    const auth = getAuth();
    const userCredentail = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentail.user;
    const token = await user.getIdToken(true);
    const res: any = await axios
      .post(
        "http://localhost:1323/users",
        { email: email, uid: user.uid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error));

    const currentUser: User = {
      id: res.data.ID,
      email: res.data.Email,
      name: res.data.Name,
    };
    setCurrentUser(() => currentUser);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-sky-200">
      <Space className="h-10" />
      <Container size="xs" px="xs" className="p-10 bg-white">
        <Title order={3} className="text-center">
          会員登録
        </Title>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              handleEmailAndPasswordSignup(values.email, values.password);
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
};

export default Signup;
