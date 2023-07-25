use std::io;
use std::str::FromStr;

use chess::{BitBoard, Board, ChessMove, Error, MoveGen, Piece, Square};
use rand::seq::{IteratorRandom, SliceRandom};
use serde::{Deserialize, Serialize};

#[derive(Debug,  Clone, Copy)]
struct Position {
    from: Square,
    to: Square,
}
fn main() {
    println!("{:?}",step_new());
}

fn step_new()->String{
    let moves: Vec<&str> = vec![
        "Nc6", "Na6", "Nh6", "Nf6", "a6", "a5", "b6", "b5", "c6", "c5", "d6", "d5", "e6", "e5",
        "f6", "f5", "g6", "g5", "h6", "h5",
    ];
    let fen = "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1";

    let board = match Board::from_str(&fen) {
        Ok(e) => e,
        Err(_) => panic!("cant do that bro"),
    };

    let result: Vec<&str> = moves
        .iter()
        .filter(|&item| item.contains('x'))
        .copied()
        .collect();

    println!("{:?}", result);
    let mut capture_list: Vec<ChessMove> = vec![];
    for items in result {
        let new_move = match ChessMove::from_san(&board, items) {
            Ok(e) => capture_list.push(e),
            _ => {}
        };
        println!("{:?}", new_move);
    }
    // let  legal_moves = MoveGen::new_legal(&board);

    let mut  position:String="".to_string();

    if capture_list.len() == 0 {
        let random_move = match MoveGen::new_legal(&board).choose(&mut rand::thread_rng()) {
            None => panic!(""),
            Some(e) => e,
        };
          position  =random_move.get_source().to_string()+&random_move.get_dest().to_string();
    }else {
        let random_capture = match capture_list.choose(&mut rand::thread_rng()) {
            None => panic!(""),
            Some(e) => e,
        };

        position  =random_capture.get_source().to_string()+&random_capture.get_dest().to_string();
    }

    position
}
/*
fn old_one(){
    println!("Hello, world!");
    let init_position = Board::from_str("rnbqkbnr/p2ppppp/8/1P6/2p5/1P6/P2PPPPP/RNBQKBNR w KQkq - 0 4").expect("Valid FEN");
    let  iterable = MoveGen::new_legal(&init_position);
    // println!("{:?}",iterable.choose(&mut rand::thread_rng()));
    // let pos=iterable.choose(&mut rand::thread_rng());
    let new_move=ChessMove::from_san(&init_position,"bxc4");

    let ress=match new_move {
        Ok(o)=>println!("destination {}",o.get_dest()),
        Err(_)=>panic!("")
    };

    // println!("{:?}",&init_position.side_to_move());

    for i  in iterable {
        let moves=&i;
        // let m= match moves.get_promotion() {
        //     Some(e)=>e,
        //     None =>panic!("very bad"),
        // };

        let source: chess::Square=moves.get_source();
        let destination: chess::Square=moves.get_dest();
        let promo=match  moves.get_promotion() {
            Some(e)=>e,
            None=>Piece::Bishop
        } ;
        println!("source : {}, destination: {} promo : {}",source,destination,promo);
    };

    // let return_pos=match pos {
    //     Some(e) => e,
    //     None =>panic!("very bad"),
    // };
    //
    // let pos:Position=Position { from:return_pos.get_source(), to: return_pos.get_dest() };
}
 *///

// parse2 dev branch create
