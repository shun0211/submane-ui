import { Menu, Avatar, UnstyledButton } from "@mantine/core";
import React, { forwardRef, useRef } from "react";

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

const Header = () => {
  const ref = useRef();

  return (
    <div className="flex justify-end">
      <Menu control={<UserButton ref={ref} />}>
        {<Menu.Item>ログアウト</Menu.Item>}
      </Menu>
    </div>
  );
};

export default Header;
