import {
  MediaQuery,
  Aside as MantineAside,
  Button,
  Box,
  Text,
  Group,
  Switch,
  Flex,
  Title,
  Paper,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import { chessGameState, playerColorState } from "../../store/atom";
import { Chess } from "chess.js";

const Aside = () => {
  const [_game, setGame] = useRecoilState(chessGameState);
  const [playerColor, setPlayerColor] = useRecoilState(playerColorState);

  function setColorPlayer(state: boolean) {
    if (state) {
      setPlayerColor("white");
    } else {
      setPlayerColor("black");
    }
  }
  return (
    <>
      <MantineAside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        <Button
          color="red"
          onClick={() => {
            console.log("clicked");
            setGame(new Chess());
          }}
        >
          New Game Instance
        </Button>
        <Group position="center" mt={"lg"}>
          <Paper withBorder p={"sm"} w={"100%"}>
            <Flex direction={"column"} align={"center"}>
              <Title order={4}>Change Color</Title>
              <Switch
                onChange={(event) =>
                  setColorPlayer(event.currentTarget.checked)
                }
                checked={playerColor == "white"}
                mt={"sm"}
                size="lg"
                onLabel="WHITE"
                offLabel="BLACK"
              />
            </Flex>
          </Paper>
        </Group>
      </MantineAside>
    </>
  );
};

export default Aside;
