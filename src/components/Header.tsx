import { Menu, Avatar, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import React, { forwardRef, useRef } from "react";
import { toast } from "react-toastify";
import { signOut } from "../api/auth";

const Header = () => {
  const ref = useRef();
  const router = useRouter();
  // eslint-disable-next-line react/display-name
  const UserButton = forwardRef((props, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.sm,
        })}
        {...props}
      >
        <Avatar src="/icon_dammy.png" alt="avatar" />
      </UnstyledButton>
    );
  });

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
    toast.success("ログアウトしました👋");
  };

  return (
    <div className="flex justify-end">
      <Menu control={<UserButton ref={ref} />}>
        {<Menu.Item onClick={handleLogout}>ログアウト</Menu.Item>}
      </Menu>
    </div>
  );
};

export default Header;
