import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "../utils/firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../hooks/authProvider";
import { signUp } from "../api/auth";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { BadRequestError } from "../utils/custom_error";

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
    try {
      const userCredentail = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredentail.user;
      const token = await firebaseUser.getIdToken(true);
      try {
        const user = await signUp(email, firebaseUser.uid, token);
        setCurrentUser(user);
        router.push("dashboard");
      } catch {
        toast.error("予期せぬエラーが発生しました。");
      }
    } catch (e) {
      if (
        e instanceof FirebaseError &&
        e.code === "auth/email-already-in-use"
      ) {
        toast.error("指定されたメールアドレスは既に使用されています。");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken(true);
    if (firebaseUser.email == null) return false;
    const user = await signUp(
      firebaseUser.email,
      firebaseUser.uid,
      token
    ).catch((e) => {
      if (e instanceof BadRequestError) {
        e.errorMessages.map((message) => toast.error(message));
      }
      throw e;
    });
    setCurrentUser(user)
    router.push("dashboard")
    toast.success("新規登録が完了しました😊", {
      autoClose: 3000,
    })
  };

  return (
    <div className="min-h-screen bg-sky-200">
      <Space className="h-10" />
      <Container size="xs" px="xs" className="p-10 bg-white">
        <Title order={3} className="text-center">
          会員登録
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
