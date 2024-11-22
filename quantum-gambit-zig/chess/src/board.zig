const std = @import("std");
const pieces = @import("pieces.zig");
pub const Board = struct {
    squares: [64]?pieces.Piece,
    pub fn new() Board {
        const pieceOrder = [8]pieces.Kind{ pieces.Kind.Rook, pieces.Kind.Knight, pieces.Kind.Bishop, pieces.Kind.Queen, pieces.Kind.King, pieces.Kind.Bishop, pieces.Kind.Knight, pieces.Kind.Rook };

        var board = Board{ .squares = undefined };
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

    pub fn fromFen(fen: []const u8) []const u8 {
        // var board = Board{ .squares = undefined };

        const allocator = std.heap.page_allocator;
        var fenSplit = std.ArrayList([]const u8).init(allocator);
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
        fenSplit.deinit();
        return fen;
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
    const equal = std.mem.eql(u8, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", board);
    try std.testing.expect(equal);
}
