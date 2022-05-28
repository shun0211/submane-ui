import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "tailwindcss/tailwind.css";
import React from "react";
import { AuthProvider } from "../utils/auth/authProvider";


export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <AuthProvider>
        <Head>
          <title>Page title</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </AuthProvider>
    </>
  );
}