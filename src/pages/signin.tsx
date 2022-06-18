import "../utils/firebase";
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { signIn } from "../api/auth";
import { AuthContext } from "../hooks/authProvider";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import {  NotFoundError } from "../utils/custom_error";
import Image from "next/image";

const Signin = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const { setCurrentUser } = useContext(AuthContext)

  const handleEmailAndPasswordSignin = async (
    email: string,
    password: string
  ) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
      .catch((e) => {
        if (e instanceof(FirebaseError) && e.code === "auth/user-not-found") {
          toast.error("ユーザが見つかりませんでした😱")
        } else if (e instanceof(FirebaseError) && e.code === "auth/invalid-email") {
          toast.error("不正なメールアドレスです")
        }
        throw e
      })
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken(true)
    const user = await signIn(email, firebaseUser.uid, token)
      .catch((e) => {
        if (e instanceof NotFoundError) {
          toast.error(e.message)
        }
        throw e
      })
    setCurrentUser(user)
    router.push('/dashboard')
    toast.success("ログインしました😊", {
      autoClose: 3000,
    })
  }

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken(true);
    if (firebaseUser.email == null) return false;
    const user = await signIn(
      firebaseUser.email,
      firebaseUser.uid,
      token
    ).catch((e) => {
      if (e instanceof NotFoundError) {
        toast.error(e.message)
      }
      throw e
    });
    setCurrentUser(user)
    router.push("dashboard")
    toast.success("ログインしました😊", {
      autoClose: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-sky-200">
      <Space className="h-10" />
      <Container size="xs" px="xs" className="p-10 bg-white">
        <Title order={3} className="text-center">
          ログイン
        </Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" className="text-center pt-5">
          <button onClick={handleGoogleLogin}>
            <Image
              src="/btn_google_signin_light_normal_web.png"
              alt="Google Login"
              width={191}
              height={46}
            />
          </button>
        </Box>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

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
