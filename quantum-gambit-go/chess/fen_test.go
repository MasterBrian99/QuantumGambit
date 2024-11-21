package chess

import (
	"fmt"
	"testing"
)

func TestInitFen(t *testing.T) {

	fen := Fen{}
	err := fen.Init()
	if err != nil {
		t.Errorf("error initializing fen: %s", err)
	}
	fmt.Println("fen:", fen.fen)
	fmt.Println("ranks:", fen.ranks)
	fmt.Println("activeColor:", fen.activeColor)
	fmt.Println("whiteCanCastleQueenSide:", fen.whiteCanCastleQueenSide)
	fmt.Println("whiteCanCastleKingSide:", fen.whiteCanCastleKingSide)
	fmt.Println("blackCanCastleQueenSide:", fen.blackCanCastleQueenSide)
	fmt.Println("blackCanCastleKingSide:", fen.blackCanCastleKingSide)
	fmt.Println("enPassantSquare:", fen.enPassantSquare)
	fmt.Println("enPassantIndex:", fen.enPassantIndex)
	fmt.Println("halfMoveClock:", fen.halfMoveClock)
	fmt.Println("fullMoveNumber:", fen.fullMoveNumber)
}
