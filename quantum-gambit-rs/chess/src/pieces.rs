
#[derive(Debug, Copy,Clone)]
pub  enum  Color {
    White,
    Black,
    Red  //basically a placeholder for off the board squares
}
#[derive(Debug, Copy,Clone)]
pub enum  Kind {
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
    Pawn,
    Empty //basically a placeholder for off the board squares
}
#[derive(Debug,Copy,Clone)]
pub struct Piece {
    pub color: Color,
    pub kind: Kind,
}