use crate::board::Board;
use crate::pieces::Color;
pub struct Chess {
   pub  board: Board,
    pub turn:Color,
}


impl Chess {
    pub fn new() -> Self {
        Chess {
            board: Board::new(),
            turn: Color::White,
        }
    }
    pub fn from_fen()->Self{
        Self {
            board: Board::from_fen(""),
            turn: Color::White,
        }
    }

}