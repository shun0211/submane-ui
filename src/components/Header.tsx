import { Menu, Avatar, UnstyledButton } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { forwardRef, useRef } from "react";

const Header = () => {
  const ref = useRef();
  const router = useRouter();
  // eslint-disable-next-line react/display-name
  const UserButton = forwardRef((props, ref) => (
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
  ));

  const handleLogout = async () => {
    const res = await axios
      .delete("http://localhost:1323/logout")
      .catch((error) => console.log(error));
    router.push("/signin");
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
