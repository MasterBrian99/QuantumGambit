import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { chessGameState } from "../../store/atom";
import { Chess } from "chess.js";
import { useState } from "react";

const UpdateFEN = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [game, setGame] = useRecoilState(chessGameState);
  const [newFen, setNewFen] = useState("");
  function updateFENGame() {
    setGame(new Chess(newFen));
    setNewFen(game.fen());
    close();
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="FEN Update">
        <TextInput value={newFen} onChange={(e) => setNewFen(e.target.value)} />

        <Button mt={"xs"} onClick={() => updateFENGame()}>
          Update
        </Button>
      </Modal>

      <Group position="center" mt={"xs"}>
        <Button onClick={open}>Update</Button>
      </Group>
    </>
  );
};

export default UpdateFEN;
