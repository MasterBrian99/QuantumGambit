package chess

import (
	"testing"
)

func TestInitialize(t *testing.T) {
	board := NewBoard()
	//board.squares[0] = Piece{White, Rook}
	if board.squares[0].color != Black {
		t.Errorf("Expected color to be White, got %v", board.squares[0].color)
	}
}

func TestNewBoardFromFen(t *testing.T) {
	board1, err := NewBoardFromFen("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2")
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if board1.squares[0].color != Black {
		t.Errorf("Expected color to be White, got %v", board1.squares[0].color)
		t.Fail()
	}
	board1.PrintEmojiBoard()
}

func TestPrintBoard(t *testing.T) {
	board := NewBoard()
	board.PrintBoard()
}
func TestGetPieceEmoji(t *testing.T) {
	board := NewBoard()
	board.PrintEmojiBoard()
}

//func TestFromFEN(t *testing.T) {
//	fen := "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
//	_, err := FromFEN(fen)
//	if err != nil {
//		t.Errorf("Expected no error, got %v", err)
//	}
//
//}
