import { Badge, Flex, Footer as MantineFooter } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { chessGameState } from "../../store/atom";
const Footer = () => {
  const game = useRecoilValue(chessGameState);

  return (
    <MantineFooter height={60} p="md">
      <Flex>
        {game.history().map((el, i) => (
          <Badge mx={"xs"} color={"pink"} key={i}>
            {el}
          </Badge>
        ))}
      </Flex>
    </MantineFooter>
  );
};

export default Footer;
