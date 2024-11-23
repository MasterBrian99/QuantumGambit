const std = @import("std");
const pieces = @import("pieces.zig");
pub const Board = struct {
    squares: [64]?pieces.Piece,
    fn initSquares() [64]?pieces.Piece {
        return [_]?pieces.Piece{null} ** 64; // Fill the array with 64 `null` elements
    }

    pub fn new() Board {
        const pieceOrder = [8]pieces.Kind{ pieces.Kind.Rook, pieces.Kind.Knight, pieces.Kind.Bishop, pieces.Kind.Queen, pieces.Kind.King, pieces.Kind.Bishop, pieces.Kind.Knight, pieces.Kind.Rook };

        var board = Board{ .squares = initSquares() };
        for (pieceOrder, 0..) |value, i| {
            const newPiece = pieces.Piece{ .color = pieces.Color.Black, .kind = value };
            board.squares[i] = newPiece;
        }
        for (8..15) |i| {
            const newPiece = pieces.Piece{ .color = pieces.Color.Black, .kind = pieces.Kind.Pawn };
            board.squares[i] = newPiece;
        }
        for (48..56) |i| {
            const newPiece = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Pawn };
            board.squares[i] = newPiece;
        }
        //idk man.just gonna do it manually
        // who cares about a for loop
        board.squares[56] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Rook };
        board.squares[57] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Knight };
        board.squares[58] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Bishop };
        board.squares[59] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Queen };
        board.squares[60] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.King };
        board.squares[61] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Bishop };
        board.squares[62] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Knight };
        board.squares[63] = pieces.Piece{ .color = pieces.Color.White, .kind = pieces.Kind.Rook };

        return board;
    }

    pub fn fromFen(fen: []const u8) Board {
        // var board = Board{ .squares = undefined };
        var board = Board{ .squares = initSquares() };

        const allocator = std.heap.page_allocator;
        var fenSplit = std.ArrayList([]const u8).init(allocator);
        fenSplit.deinit();
        var split = std.mem.split(u8, fen, " ");

        while (split.next()) |value| {
            fenSplit.append(value) catch {
                std.debug.print("Failed to append value\n", .{});
                break;
            };
        }
        for (fenSplit.items) |item| {
            std.debug.print(" {s}\n", .{item});
        }
        for (fen) |c| {
            if (c == ' ') break;
            var rank: usize = 0;
            var file: usize = 0;
            switch (c) {
                '/' => {
                    rank += 1;
                    file = 0;
                },
                '1'...'8' => {
                    const numEmptySquares = @as(usize, c - '0');
                    for (numEmptySquares) |_| {
                        // if (rank * 8 + file >= 64) return error.InvalidFEN;
                        board.squares[rank * 8 + file] = null;
                        file += 1;
                    }
                },
                else => {
                    const piece = switch (c) {
                        'P' => pieces.Piece.new(.White, .Pawn),
                        'N' => pieces.Piece.new(.White, .Knight),
                        'B' => pieces.Piece.new(.White, .Bishop),
                        'R' => pieces.Piece.new(.White, .Rook),
                        'Q' => pieces.Piece.new(.White, .Queen),
                        'K' => pieces.Piece.new(.White, .King),
                        'p' => pieces.Piece.new(.Black, .Pawn),
                        'n' => pieces.Piece.new(.Black, .Knight),
                        'b' => pieces.Piece.new(.Black, .Bishop),
                        'r' => pieces.Piece.new(.Black, .Rook),
                        'q' => pieces.Piece.new(.Black, .Queen),
                        'k' => pieces.Piece.new(.Black, .King),
                        else => null,
                    };
                    // if (rank * 8 + file >= 64) return error.InvalidFEN;
                    board.squares[rank * 8 + file] = piece;
                    file += 1;
                },
            }
        }
        return board;
    }
};

test "new board" {
    const board = Board.new();

    // for (board.squares, 0..) |value, i| {
    //     std.debug.print("{} : ", .{i});
    //     // const newPiece = pieces.Piece{ .color = pieces.Color.Black, .kind = pieces.Kind.Bishop };

    //     // if (@typeInfo(@TypeOf(value)) == .Optional) {
    //     // std.debug.print("null \n ", .{});
    //     // } else {
    //     std.debug.print("{?} \n ", .{value});
    //     // }
    // }
    try std.testing.expect(board.squares[0] != null);
    try std.testing.expect(board.squares[0].?.color == pieces.Color.Black);
    // std.testing.expect(board.squares[1] == pieces.Piece{ .color = pieces.Color.Black, .kind = pieces.Kind.Knight });
}

test "from fen" {
    const board = Board.fromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    try std.testing.expect(board.squares[0] != null);
    try std.testing.expect(board.squares[0]);
    try std.testing.expect(board.squares[0].?.color == pieces.Color.Black);
}
