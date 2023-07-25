import {
  Aside as MantineAside,
  Button,
  Group,
  Switch,
  Flex,
  Title,
  Paper,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import {
  chessGameState,
  isGameStartState,
  playerColorState,
} from "../../store/atom";
import { Chess } from "chess.js";
import UpdateFEN from "./UpdateFEN";

const Aside = () => {
  const [_game, setGame] = useRecoilState(chessGameState);
  const [playerColor, setPlayerColor] = useRecoilState(playerColorState);
  const [isGameStart, setIsGameStart] = useRecoilState(isGameStartState);

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
        <Paper withBorder p={"sm"} w={"100%"} mt={"md"}>
          <Flex direction={"column"}>
            <Button
              disabled={isGameStart}
              color="cyan"
              onClick={() => {
                console.log("clicked");
                setIsGameStart(true);
              }}
            >
              Start Game
            </Button>
            <Button
              disabled={!isGameStart}
              mt={"md"}
              color="teal"
              onClick={() => {
                console.log("clicked");
                setIsGameStart(false);
              }}
            >
              Stop Game
            </Button>
          </Flex>
        </Paper>

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
          <Paper withBorder p={"sm"} w={"100%"}>
            <Flex direction={"column"} align={"center"}>
              <Title order={4}>Update FEN</Title>
              <UpdateFEN />
            </Flex>
          </Paper>
        </Group>
      </MantineAside>
    </>
  );
};

export default Aside;
