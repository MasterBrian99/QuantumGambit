package chess

import "fmt"

const (
	BoardSize       = 12 * 12
	PlayableSquares = 8
)

/*
      a b c d e f g h
  ? ? ? ? ? ? ? ? ? ? ? ?
  ? ? ? ? ? ? ? ? ? ? ? ?
8 ? ? ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ ? ? 8
7 ? ? ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ ? ? 7
6 ? ? x x x x x x x x ? ? 6
5 ? ? x x x x x x x x ? ? 5
4 ? ? x x x x x x x x ? ? 4
3 ? ? x x x x x x x x ? ? 3
2 ? ? ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ ? ? 2
1 ? ? ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ ? ? 1
  ? ? ? ? ? ? ? ? ? ? ? ?
  ? ? ? ? ? ? ? ? ? ? ? ?
      a b c d e f g h
*/

type Board struct {
	squares [BoardSize]Piece
}

func (b *Board) Initialize() {
	for i := 0; i < 144; i++ {
		b.squares[i] = Piece{}
	}
	for i := 0; i < PlayableSquares; i++ {
		b.squares[12*3+2+i] = Piece{color: Black, kind: Pawn} //39,40,41
		b.squares[12*8+2+i] = Piece{color: White, kind: Pawn} // 111,112,113
	}
	initialSetup := []Kind{Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook}
	for i, kind := range initialSetup {
		b.squares[12*2+2+i] = Piece{color: Black, kind: kind} // Black major pieces
		b.squares[12*9+2+i] = Piece{color: White, kind: kind} // White major pieces
	}
}

func (b *Board) FromFen(fen string) {

}
func (b *Board) PrintBoard() {
	for row := 0; row < 12; row++ {
		for col := 0; col < 12; col++ {
			idx := row*12 + col
			piece := b.squares[idx]
			if piece.kind == 0 { // Non-playable or empty square
				fmt.Print(".   ")
			} else {
				color := "W" // Default to White
				if piece.color == Black {
					color = "B"
				}
				fmt.Printf("%s%-2s ", color, kindToString(piece.kind))
			}
		}
		fmt.Println()
	}
}
func (b *Board) PrintEmojiBoard() {
	println("      a b c d e f g h")
	//var arr = [64]int{}
	//var arr = make([]int, 64)
	var playableRank = 8
	for i := 0; i < 12; i++ {
		if i == 0 || i == 11 {
			fmt.Println("  ? ? ? ? ? ? ? ? ? ? ? ?")
		} else if i >= 2 && i <= 9 {
			print(playableRank)
			print(" ? ? ")
			for j := 2; j < 10; j++ {
				var index = i*12 + j
				var piece = b.squares[index]
				//println(index)
				//arr = append(arr, index)
				if piece.kind == 0 {
					fmt.Printf("x ")
				} else {
					fmt.Printf("%s ", b.GetPieceEmoji(piece))
				}
			}
			fmt.Printf("? ? %d\n", playableRank)
			playableRank -= 1
		} else {
			fmt.Println("  ? ? ? ? ? ? ? ? ? ? ? ?")
		}
	}
	fmt.Println("      a b c d e f g h")
	//fmt.Println(arr)
}

func kindToString(kind Kind) string {
	switch kind {
	case King:
		return "K"
	case Queen:
		return "Q"
	case Rook:
		return "R"
	case Bishop:
		return "B"
	case Knight:
		return "N"
	case Pawn:
		return "P"
	default:
		return ""
	}
}

func (b *Board) GetPieceEmoji(piece Piece) string {
	emojis := map[Color]map[Kind]string{
		Black: {
			King:   "♚",
			Queen:  "♛",
			Rook:   "♜",
			Bishop: "♝",
			Knight: "♞",
			Pawn:   "♟",
		},
		White: {
			King:   "♔",
			Queen:  "♕",
			Rook:   "♖",
			Bishop: "♗",
			Knight: "♘",
			Pawn:   "♙",
		},
	}

	if colorMap, ok := emojis[piece.color]; ok {
		if emoji, ok := colorMap[piece.kind]; ok {
			return emoji
		}
	}
	return "x"
}

//func (b *Board) GetAvailableMoves() []string {
//
//}
