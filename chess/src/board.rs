use crate::pieces::{Kind, Piece};
use crate::pieces::Color;

/*
      a b c d e f g h
  ? ? ? ? ? ? ? ? ? ? ? ?
  ? ? ? ? ? ? ? ? ? ? ? ?
8 ? ? ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ ? ? 8
7 ? ? ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ ? ? 7
6 ? ? x x x x x x x x ? ? 6
5 ? ? x x x x x x x x ? ? 5
4 ? ? x x x x x x x x ? ? 4
3 ? ? x x x x x x x x ? ? 3
2 ? ? ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ ? ? 2
1 ? ? ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ ? ? 1
  ? ? ? ? ? ? ? ? ? ? ? ?
  ? ? ? ? ? ? ? ? ? ? ? ?
      a b c d e f g h
 */


#[derive(Debug)]
pub struct Board {
    // 12 *12
    squares: [Option<Piece>; 144], //https://en.wikipedia.org/wiki/Board_representation_(computer_chess)#Square_list
}

impl Board {
    pub fn new() -> Board {
        Board {
            squares: Board::generate_initial_board(),
        }
    }
    pub  fn from_fen(fen:&str)->Self{

        let mut squares: [Option<Piece>; 144] = [None; 144];

        // Fill the entire board with Red placeholders for off-board squares
        for i in 0..144 {
            let row = i / 12;
            let col = i % 12;
            if row < 2 || row > 9 || col < 2 || col > 9 {
                squares[i] = Some(Piece {
                    color: Color::Red,
                    kind: Kind::Empty,
                });
            }
        };
        let piece_from_char = |c: char| -> Option<Piece> {
            let color = if c.is_uppercase() { Color::White } else { Color::Black };
            let kind = match c.to_ascii_lowercase() {
                'k' => Kind::King,
                'q' => Kind::Queen,
                'r' => Kind::Rook,
                'b' => Kind::Bishop,
                'n' => Kind::Knight,
                'p' => Kind::Pawn,
                _ => Kind::Empty,
            };
            Some(Piece { color, kind })
        };
        let ranks: Vec<&str> = fen.split('/').collect();
        for (rank_idx, rank) in ranks.iter().enumerate() {
            let board_row = 2 + rank_idx; // FEN's top-to-bottom corresponds to board's 2 to 9

            let mut board_col = 2;
            for c in rank.chars() {
                if c.is_digit(10) {
                    // Empty squares (e.g., '3' -> 3 empty squares)
                    board_col += c.to_digit(10).unwrap() as usize;
                } else {
                    // Place a piece
                    squares[board_row * 12 + board_col] = piece_from_char(c);
                    board_col += 1;
                }
            }
        }

        Board { squares }

    }

    fn is_inside_playable_area(index: usize) -> bool {
        let row = index / 12;
        let col = index % 12;
        row >= 2 && row <= 9 && col >= 2 && col <= 9
    }

    pub fn generate_initial_board() -> [Option<Piece>; 144] {
        let mut board: [Option<Piece>; 144] = [None; 144];

        // Fill off-board squares with Red placeholders
        for i in 0..144 {
            if !Board::is_inside_playable_area(i) {
                board[i] = Some(Piece {
                    color: Color::Red,
                    kind: Kind::Empty,
                });
            }
        }

        // Fill Black pieces (top rows)
        let black_pieces = [
            Kind::Rook,
            Kind::Knight,
            Kind::Bishop,
            Kind::Queen,
            Kind::King,
            Kind::Bishop,
            Kind::Knight,
            Kind::Rook,
        ];
        for (i, &kind) in black_pieces.iter().enumerate() {
            board[2 * 12 + 2 + i] = Some(Piece {
                color: Color::Black,
                kind,
            });
            board[3 * 12 + 2 + i] = Some(Piece {
                color: Color::Black,
                kind: Kind::Pawn,
            });
        }

        // Fill White pieces (bottom rows)
        let white_pieces = [
            Kind::Rook,
            Kind::Knight,
            Kind::Bishop,
            Kind::Queen,
            Kind::King,
            Kind::Bishop,
            Kind::Knight,
            Kind::Rook,
        ];
        for (i, &kind) in white_pieces.iter().enumerate() {
            board[9 * 12 + 2 + i] = Some(Piece {
                color: Color::White,
                kind,
            });
            board[8 * 12 + 2 + i] = Some(Piece {
                color: Color::White,
                kind: Kind::Pawn,
            });
        }

        // Fill empty playable squares
        for row in 4..8 {
            for col in 2..10 {
                board[row * 12 + col] = Some(Piece {
                    color: Color::White,
                    kind: Kind::Empty,
                });
            }
        }

        board
    }

    pub fn print_board(&self) {
        for i in 0..12 {
            for j in 0..12 {
                match self.squares[i * 12 + j] {
                    Some(ref piece) => {
                        match piece.color {
                            Color::White | Color::Black => {
                                print!("{:?} ", piece.kind);
                            }
                            Color::Red => {
                                print!("? ");
                            }
                        }
                    }
                    None => {
                        print!("x "); // Empty playable squares
                    }
                }
            }
            println!();
        }
        println!();
    }
    pub fn print_chess_board(&self) {
        let piece_symbols = |piece: &Piece| match (piece.color, piece.kind) {
            (Color::White, Kind::King) => '♔',
            (Color::White, Kind::Queen) => '♕',
            (Color::White, Kind::Rook) => '♖',
            (Color::White, Kind::Bishop) => '♗',
            (Color::White, Kind::Knight) => '♘',
            (Color::White, Kind::Pawn) => '♙',
            (Color::Black, Kind::King) => '♚',
            (Color::Black, Kind::Queen) => '♛',
            (Color::Black, Kind::Rook) => '♜',
            (Color::Black, Kind::Bishop) => '♝',
            (Color::Black, Kind::Knight) => '♞',
            (Color::Black, Kind::Pawn) => '♟',
            _ => 'x', // Placeholder for empty playable squares
        };
        let mut playable_rank = 8;
        // Print column labels at the top
        println!("      a b c d e f g h");

        for i in (0..12).rev() {
            if i == 0 || i == 11 {
                // Print outer padding row
                println!("  ? ? ? ? ? ? ? ? ? ? ? ?");
            } else if i >= 2 && i <= 9 {
                // Print playable area
                print!("{} ", playable_rank); // Print rank number
                print!("? ? "); // Left padding

                for j in 2..10 {
                    let index = i * 12 + j;
                    if let Some(piece) = &self.squares[index] {
                        print!("{} ", piece_symbols(piece)); // Print piece symbol
                    } else {
                        print!("x "); // Print empty playable square
                    }
                }

                println!("? ? {}", playable_rank); // Right padding and rank number
                playable_rank -= 1;
            } else {
                // Print non-playable padding rows
                println!("  ? ? ? ? ? ? ? ? ? ? ? ?");
            }
        }
        // Print column labels at the bottom
        println!("      a b c d e f g h");
    }
}
