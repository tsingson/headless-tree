import React, { FC, ReactNode } from "react";
import { ActionIcon, Header, useMantineColorScheme } from "@mantine/core";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/all";

export type HeaderBarProps = {};

export const HeaderBar: FC<HeaderBarProps> = ({}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Header height={60}>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IoSunnyOutline /> : <IoMoonOutline />}
      </ActionIcon>
    </Header>
  );
};