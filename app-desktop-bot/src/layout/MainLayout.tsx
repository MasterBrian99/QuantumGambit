import { useState } from "react";
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import Chessboard from "../components/Chessboard/Chessboard";
import Aside from "./components/Aside";
import Navbar from "./components/Navbar";

export default function MainLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar />}
      aside={<Aside />}
    >
      <Chessboard />
    </AppShell>
  );
}
