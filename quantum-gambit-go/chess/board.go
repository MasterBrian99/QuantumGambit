package chess

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

type Board struct {
	squares [64]Piece
}

func NewBoard() Board {
	board := Board{}

	pieceOrder := []Piece{
		NewPiece(Black, Rook),
		NewPiece(Black, Knight),
		NewPiece(Black, Bishop),
		NewPiece(Black, Queen),
		NewPiece(Black, King),
		NewPiece(Black, Bishop),
		NewPiece(Black, Knight),
		NewPiece(Black, Rook),
	}
	for i, element := range pieceOrder {
		board.squares[i] = element
	}
	for i := 8; i < 16; i++ {
		board.squares[i] = NewPiece(Black, Pawn)
	}
	for i := 48; i < 56; i++ {
		board.squares[i] = NewPiece(White, Pawn)
	}
	board.squares[56] = NewPiece(White, Rook)
	board.squares[57] = NewPiece(White, Knight)
	board.squares[58] = NewPiece(White, Bishop)
	board.squares[59] = NewPiece(White, Queen)
	board.squares[60] = NewPiece(White, King)
	board.squares[61] = NewPiece(White, Bishop)
	board.squares[62] = NewPiece(White, Knight)
	board.squares[63] = NewPiece(White, Rook)

	return board
}

func NewBoardFromFen(fen string) (Board, error) {
	board := Board{}
	index := 0
	slices := strings.Split(strings.Trim(fen, " "), " ")
	if len(slices) != 6 {
		return board, fmt.Errorf("invalid FEN string")
	}
	ranks := strings.Split(slices[0], "/")

	if len(ranks) != 8 {
		return board, errors.New("invalid FEN string: incorrect number of ranks")
	}
	for _, rank := range ranks {
		for _, char := range rank {
			switch {
			case char >= '1' && char <= '8': // Empty squares
				numEmpty, _ := strconv.Atoi(string(char))
				for i := 0; i < numEmpty; i++ {
					if index >= 64 {
						return board, errors.New("invalid FEN string: too many squares")
					}
					board.squares[index] = Piece{}
					index++
				}
			default: // Pieces
				if index >= 64 {
					return board, errors.New("invalid FEN string: too many squares")
				}
				piece, err := parsePiece(char)
				if err != nil {
					return board, err
				}
				board.squares[index] = piece
				index++
			}
		}
	}

	if index != 64 {
		return board, errors.New("invalid FEN string: not enough squares")
	}
	return board, nil
}
func parsePiece(char rune) (Piece, error) {
	switch char {
	case 'P':
		return NewPiece(White, Pawn), nil
	case 'N':
		return NewPiece(White, Knight), nil
	case 'B':
		return NewPiece(White, Bishop), nil
	case 'R':
		return NewPiece(White, Rook), nil
	case 'Q':
		return NewPiece(White, Queen), nil
	case 'K':
		return NewPiece(White, King), nil
	case 'p':
		return NewPiece(Black, Pawn), nil
	case 'n':
		return NewPiece(Black, Knight), nil
	case 'b':
		return NewPiece(Black, Bishop), nil
	case 'r':
		return NewPiece(Black, Rook), nil
	case 'q':
		return NewPiece(Black, Queen), nil
	case 'k':
		return NewPiece(Black, King), nil
	default:
		return Piece{}, fmt.Errorf("invalid piece character: %c", char)
	}
}
func (b *Board) PrintBoard() {
	for row := 0; row < 8; row++ {
		for col := 0; col < 8; col++ {
			idx := row*8 + col
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

func (b *Board) PrintEmojiBoard() {
	println("  a  b  c  d  e  f  g  h")
	for i := 0; i < 8; i++ {
		fmt.Printf("%d ", 7-i+1)
		for j := 0; j < 8; j++ {
			idx := i*8 + j
			piece := b.squares[idx]
			if piece.kind == 0 { // Non-playable or empty square
				fmt.Print(".  ")
			} else {
				fmt.Printf("%-2s ", b.GetPieceEmoji(piece))
			}
		}
		println()
	}
	fmt.Println("  a  b  c  d  e  f  g  h")
}
