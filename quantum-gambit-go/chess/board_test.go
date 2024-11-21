package chess

import (
	"testing"
)

func newBoard() Board {

	b := Board{}
	b.Initialize()
	return b
}

func TestInitialize(t *testing.T) {
	newBoard()
}

func TestPrintBoard(t *testing.T) {
	b := newBoard()
	b.PrintBoard()
}

func TestPrintEmojiBoard(t *testing.T) {
	b := newBoard()
	b.PrintEmojiBoard()
}
