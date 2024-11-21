package chess

const (
	White Color = iota + 1
	Black
)

const (
	King Kind = iota + 1
	Queen
	Rook
	Bishop
	Knight
	Pawn
)

type Color int
type Kind int

type Piece struct {
	color Color
	kind  Kind
}
