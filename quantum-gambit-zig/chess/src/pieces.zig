const std = @import("std");

pub const Color = enum { White, Black };

pub const Kind = enum {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King,
};

pub const Piece = struct {
    color: Color,
    kind: Kind,
    pub fn new(color: Color, kind: Kind) Piece {
        return Piece{ .color = color, .kind = kind };
    }
};

// pub fn newPiece(color: Color, kind: Kind) Piece {
//     return Piece{ .color = color, .kind = kind };
// }

test "new piece" {
    const piece = Piece.new(Color.Black, Kind.Bishop);
    const newPieceItem = Piece.new(Color.Black, Kind.Bishop);
    try std.testing.expect(piece.color == newPieceItem.color);
    try std.testing.expect(piece.kind == newPieceItem.kind);
}
