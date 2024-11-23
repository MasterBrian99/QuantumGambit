package chess

type Square struct {
	File int //File refers to the eight vertical columns on the board, labelled a to h.
	Rank int //Rank refers to the eight horizontal rows on the board, labelled 1 to 8.
}

func NewSquare(file int, rank int) Square {
	return Square{file, rank}
}
func NewSquareFromArrCoordinates(coordinate int) Square {
	return Square{int(coordinate % 8), 7 - int(coordinate/8)}
}
func (s Square) ToArrCoordinates() int {
	return (7-s.Rank)*8 + s.File
}
