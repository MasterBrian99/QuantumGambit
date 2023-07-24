import {
  Text,
  Navbar as MantineNavbar,
  Alert,
  Badge,
  Group,
  Box,
  ScrollArea,
} from "@mantine/core";
import { useRecoilValue } from "recoil";
import { chessGameState } from "../../store/atom";

const Navbar = () => {
  const game = useRecoilValue(chessGameState);

  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <Alert title="History" color="orange">
        <Box component={ScrollArea} h={150}>
          {game.history().map((el, i) => (
            <Badge mx={"xs"} color={"pink"} key={i}>
              {el}
            </Badge>
          ))}
        </Box>
      </Alert>
      <Alert title="In Check !" color="teal" mt={"sm"}>
        <Group position={"center"}>
          {game.in_check() ? (
            <Badge color="red">Yes</Badge>
          ) : (
            <Badge color="red">No</Badge>
          )}
        </Group>
      </Alert>
      <Alert title="Is Checkmate !" color="cyan" mt={"sm"}>
        <Group position={"center"}>
          {game.in_checkmate() ? (
            <Badge color="red">Yes</Badge>
          ) : (
            <Badge color="red">No</Badge>
          )}
        </Group>
      </Alert>
      <Alert title="Is Draw !" color="grape" mt={"sm"}>
        <Group position={"center"}>
          {game.in_draw() ? (
            <Badge color="red">Yes</Badge>
          ) : (
            <Badge color="red">No</Badge>
          )}
        </Group>
      </Alert>
    </MantineNavbar>
  );
};

export default Navbar;
