use chess::board::Board;


fn main() {
    // let mut chess = Chess::from_fen();
    // chess.board.print_chess_board();
    let mut board = Board::from_fen("B4bnr/p2q2kp/2nQ1p2/1Np1P3/3N1Pp1/B7/P2K2PP/2R4R w - - 0 20");
    println!();
    board.print_chess_board();
    println!();

}
