package chess

import (
	"reflect"
	"strconv"
	"testing"
)

func TestIndexToSquare(t *testing.T) {
	tests := []struct {
		index  int
		square Square
	}{
		{26, Square{File: "a", Rank: 8}},
		{27, Square{File: "b", Rank: 8}},
		{28, Square{File: "c", Rank: 8}},
		{29, Square{File: "d", Rank: 8}},
		{30, Square{File: "e", Rank: 8}},
		{31, Square{File: "f", Rank: 8}},
		{32, Square{File: "g", Rank: 8}},
		{33, Square{File: "h", Rank: 8}},
		{110, Square{File: "a", Rank: 1}},
		{117, Square{File: "h", Rank: 1}},
	}

	for _, test := range tests {
		t.Run(test.square.File+strconv.Itoa(test.square.Rank), func(t *testing.T) {
			result := IndexToSquare(test.index)
			if !reflect.DeepEqual(result, test.square) {
				t.Logf("Expected %s, but got %s", test.square.File+strconv.Itoa(test.square.Rank), result.File+strconv.Itoa(result.Rank))
				t.Fail()
			}
		})
	}
}

func TestSquareToIndex(t *testing.T) {
	tests := []struct {
		square Square
		index  int
	}{
		{Square{File: "a", Rank: 8}, 26},
		{Square{File: "b", Rank: 8}, 27},
		{Square{File: "c", Rank: 8}, 28},
		{Square{File: "d", Rank: 8}, 29},
		{Square{File: "e", Rank: 8}, 30},
		{Square{File: "f", Rank: 8}, 31},
		{Square{File: "g", Rank: 8}, 32},
		{Square{File: "h", Rank: 8}, 33},
		{Square{File: "a", Rank: 1}, 110},
		{Square{File: "h", Rank: 1}, 117},
	}

	for _, test := range tests {
		t.Run(test.square.File+strconv.Itoa(test.square.Rank), func(t *testing.T) {
			result := SquareToIndex(test.square)
			if result != test.index {
				t.Logf("Expected %d, but got %d", test.index, result)
				t.Fail()
			}
		})
	}
}
