package chess

type Square struct {
	File string
	Rank int
}

func IndexToSquare(index int) Square {
	if index < 26 || index > 117 {
		return Square{} // Non-playable area
	}

	val, ok := indexToSquares[index]
	if !ok {
		return Square{}
	}
	return val
}

func SquareToIndex(square Square) int {
	return squareToIndex[square]
}

var squareToIndex = map[Square]int{
	Square{File: "a", Rank: 8}: 26,
	Square{File: "b", Rank: 8}: 27,
	Square{File: "c", Rank: 8}: 28,
	Square{File: "d", Rank: 8}: 29,
	Square{File: "e", Rank: 8}: 30,
	Square{File: "f", Rank: 8}: 31,
	Square{File: "g", Rank: 8}: 32,
	Square{File: "h", Rank: 8}: 33,
	Square{File: "a", Rank: 7}: 38,
	Square{File: "b", Rank: 7}: 39,
	Square{File: "c", Rank: 7}: 40,
	Square{File: "d", Rank: 7}: 41,
	Square{File: "e", Rank: 7}: 42,
	Square{File: "f", Rank: 7}: 43,
	Square{File: "g", Rank: 7}: 44,
	Square{File: "h", Rank: 7}: 45,
	Square{File: "a", Rank: 6}: 50,
	Square{File: "b", Rank: 6}: 51,
	Square{File: "c", Rank: 6}: 52,
	Square{File: "d", Rank: 6}: 53,
	Square{File: "e", Rank: 6}: 54,
	Square{File: "f", Rank: 6}: 55,
	Square{File: "g", Rank: 6}: 56,
	Square{File: "h", Rank: 6}: 57,
	Square{File: "a", Rank: 5}: 62,
	Square{File: "b", Rank: 5}: 63,
	Square{File: "c", Rank: 5}: 64,
	Square{File: "d", Rank: 5}: 65,
	Square{File: "e", Rank: 5}: 66,
	Square{File: "f", Rank: 5}: 67,
	Square{File: "g", Rank: 5}: 68,
	Square{File: "h", Rank: 5}: 69,
	Square{File: "a", Rank: 4}: 74,
	Square{File: "b", Rank: 4}: 75,
	Square{File: "c", Rank: 4}: 76,
	Square{File: "d", Rank: 4}: 77,
	Square{File: "e", Rank: 4}: 78,
	Square{File: "f", Rank: 4}: 79,
	Square{File: "g", Rank: 4}: 80,
	Square{File: "h", Rank: 4}: 81,
	Square{File: "a", Rank: 3}: 86,
	Square{File: "b", Rank: 3}: 87,
	Square{File: "c", Rank: 3}: 88,
	Square{File: "d", Rank: 3}: 89,
	Square{File: "e", Rank: 3}: 90,
	Square{File: "f", Rank: 3}: 91,
	Square{File: "g", Rank: 3}: 92,
	Square{File: "h", Rank: 3}: 93,
	Square{File: "a", Rank: 2}: 98,
	Square{File: "b", Rank: 2}: 99,
	Square{File: "c", Rank: 2}: 100,
	Square{File: "d", Rank: 2}: 101,
	Square{File: "e", Rank: 2}: 102,
	Square{File: "f", Rank: 2}: 103,
	Square{File: "g", Rank: 2}: 104,
	Square{File: "h", Rank: 2}: 105,
	Square{File: "a", Rank: 1}: 110,
	Square{File: "b", Rank: 1}: 111,
	Square{File: "c", Rank: 1}: 112,
	Square{File: "d", Rank: 1}: 113,
	Square{File: "e", Rank: 1}: 114,
	Square{File: "f", Rank: 1}: 115,
	Square{File: "g", Rank: 1}: 116,
	Square{File: "h", Rank: 1}: 117,
}

var indexToSquares = map[int]Square{
	26:  Square{File: "a", Rank: 8},
	27:  {File: "b", Rank: 8},
	28:  Square{File: "c", Rank: 8},
	29:  Square{File: "d", Rank: 8},
	30:  Square{File: "e", Rank: 8},
	31:  Square{File: "f", Rank: 8},
	32:  Square{File: "g", Rank: 8},
	33:  Square{File: "h", Rank: 8},
	38:  Square{File: "a", Rank: 7},
	39:  Square{File: "b", Rank: 7},
	40:  Square{File: "c", Rank: 7},
	41:  Square{File: "d", Rank: 7},
	42:  Square{File: "e", Rank: 7},
	43:  Square{File: "f", Rank: 7},
	44:  Square{File: "g", Rank: 7},
	45:  Square{File: "h", Rank: 7},
	50:  Square{File: "a", Rank: 6},
	51:  Square{File: "b", Rank: 6},
	52:  Square{File: "c", Rank: 6},
	53:  Square{File: "d", Rank: 6},
	54:  Square{File: "e", Rank: 6},
	55:  Square{File: "f", Rank: 6},
	56:  Square{File: "g", Rank: 6},
	57:  Square{File: "h", Rank: 6},
	62:  Square{File: "a", Rank: 5},
	63:  Square{File: "b", Rank: 5},
	64:  Square{File: "c", Rank: 5},
	65:  Square{File: "d", Rank: 5},
	66:  Square{File: "e", Rank: 5},
	67:  {File: "f", Rank: 5},
	68:  Square{File: "g", Rank: 5},
	69:  Square{File: "h", Rank: 5},
	74:  Square{File: "a", Rank: 4},
	75:  Square{File: "b", Rank: 4},
	76:  Square{File: "c", Rank: 4},
	77:  Square{File: "d", Rank: 4},
	78:  Square{File: "e", Rank: 4},
	79:  Square{File: "f", Rank: 4},
	80:  Square{File: "g", Rank: 4},
	81:  Square{File: "h", Rank: 4},
	86:  Square{File: "a", Rank: 3},
	87:  Square{File: "b", Rank: 3},
	88:  Square{File: "c", Rank: 3},
	89:  Square{File: "d", Rank: 3},
	90:  Square{File: "e", Rank: 3},
	91:  Square{File: "f", Rank: 3},
	92:  Square{File: "g", Rank: 3},
	93:  Square{File: "h", Rank: 3},
	98:  Square{File: "a", Rank: 2},
	99:  Square{File: "b", Rank: 2},
	100: Square{File: "c", Rank: 2},
	101: Square{File: "d", Rank: 2},
	102: Square{File: "e", Rank: 2},
	103: Square{File: "f", Rank: 2},
	104: Square{File: "g", Rank: 2},
	105: Square{File: "h", Rank: 2},
	110: Square{File: "a", Rank: 1},
	111: Square{File: "b", Rank: 1},
	112: Square{File: "c", Rank: 1},
	113: Square{File: "d", Rank: 1},
	114: Square{File: "e", Rank: 1},
	115: Square{File: "f", Rank: 1},
	116: Square{File: "g", Rank: 1},
	117: Square{File: "h", Rank: 1},
}