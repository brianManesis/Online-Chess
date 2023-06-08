import { SquareModel } from "./SquareModel";

export function possiblePawnMoves(square:SquareModel, playerColor:string){
    // //need to add way of calculating possible moves depending on playerColor
    // let pawn = square.getPiece();
    // let pos = square.getPos();
    // const direction = pawn?.getColor() == playerColor? 1:-1;
    // const boundry = playerColor
    // let col = pos.charAt(0);
    // let row = parseInt(pos.charAt(1));
    // let possibleMoves:Set<string> = new Set();
    // if(pawn && pawn.beenMoved && row < 8){
    //     possibleMoves.add(col+(row+direction));
    // }
    // else if(pawn && !pawn.beenMoved && (row < 8)){
    //     possibleMoves.add(col+(row+direction));
    //     console.log(pawn && (!pawn.beenMoved) && (row < 8));
    //     if(row+2 <= 8){
    //         possibleMoves.add(col+(row+2*direction));
    //     }
    // }
    // return possibleMoves;
}