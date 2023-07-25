use chess::{Board, ChessMove, MoveGen};
use rand::seq::{SliceRandom, IteratorRandom};
use std::str::FromStr;

#[tauri::command]
pub fn my_custom_command() {
    println!("I was invoked from JS!");
}

#[tauri::command]
pub fn get_all_moves(value: String)->String {
    println!("Hello, world!");
    let init_position = Board::from_str(&value).expect("Valid FEN");
    let  iterable = MoveGen::new_legal(&init_position);
    // println!("{:?}",iterable.choose(&mut rand::thread_rng()));
    let pos=iterable.choose(&mut rand::thread_rng());
    // for i  in iterable {
    //     let moves=&i;
    //     let source: chess::Square=moves.get_source();
    //     let destination: chess::Square=moves.get_dest();
    //    println!("source : {}, destination: {} ",source,destination);
    // }

    let return_pos=match pos {
        Some(e) => e,
        None =>panic!("very bad"),
    };
    let pos=return_pos.get_source().to_string()+&return_pos.get_dest().to_string();
    // let pos:Position=Position { from:return_pos.get_source(), to: return_pos.get_dest() };
    pos
}

#[tauri::command]
pub fn step_new(player_fen:String,move_list:Vec<&str>)->String{
    println!("{:?}",player_fen);
    println!("{:?}",move_list);
    let moves: Vec<&str> =move_list;
    let fen =player_fen;

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