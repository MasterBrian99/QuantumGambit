package chess

type Move struct {
	piece     Piece
	from      Square
	file      string
	rank      int
	to        Square
	promotion Kind
	castling  Kind
}

func (m *Move) FromSan(color Color, san string) {
	if san == "0-0" {
		m.piece = Piece{
			color: color,
			kind:  King,
		}
		m.castling = King
	}
	if san == "0-0-0" {
		m.piece = Piece{
			color: color,
			kind:  King,
		}
		m.castling = Queen
	}
	chars := []rune(san)
	if len(chars) < 2 {
		return
	}
	//piece := getPiece(chars[0], color)
	if chars[1] == 'x' {
		if len(chars) < 4 {
			return
		}
		captureIter := chars[2:]
		m.FromSan(color, string(captureIter))
	}

}

func getPiece(first rune, color Color) Piece {
	switch first {
	case 'N':
		return Piece{
			color: color,
			kind:  Knight,
		}
	case 'B':
		return Piece{
			color: color,
			kind:  Bishop,
		}
	case 'R':
		return Piece{
			color: color,
			kind:  Rook,
		}
	case 'Q':
		return Piece{
			color: color,
			kind:  Queen,
		}
	case 'K':
		return Piece{
			color: color,
			kind:  King,
		}
	default:
		return Piece{
			kind:  Pawn,
			color: color,
		}
	}
}
