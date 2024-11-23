package chess

type Move struct {
	piece      Piece
	fromSquare Square
	fromFile   int
	fromRank   int
	toSquare   Square
	promotion  Kind
	castling   Kind
}
