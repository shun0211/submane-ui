import React from "react";
import { HomeIcon, UserIcon } from "@heroicons/react/solid";

export const SidebarData = [
  {
    title: "ホーム",
    link: "/home",
    icon: <HomeIcon className="h-7 w-7" />,
  },
  {
    title: "マイページ",
    link: "/mypage",
    icon: <UserIcon className="h-7 w-7" />,
  },
];
