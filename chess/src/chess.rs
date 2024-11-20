use crate::board::Board;
use crate::pieces::Color;
pub struct Chess {
    board: Board,
    turn:Color,
}


impl Chess {
    pub fn new() -> Chess {
        Chess {
            board: Board::new(),
            turn: Color::White,
        }
    }


}