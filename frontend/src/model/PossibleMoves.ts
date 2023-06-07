import { SquareModel } from "./SquareModel";

export function possiblePawnMoves(square:SquareModel, playerColor:string){
    //need to add way of calculating possible moves depending on playerColor
    let pawn = square.getPiece();
    let pos = square.getPos();
    let col = pos.charAt(0);
    let row = parseInt(pos.charAt(1));
    let possibleMoves:Set<string> = new Set();
    console.log(pawn?.HAS_MOVED);
    if(pawn && pawn.HAS_MOVED && row < 9){
        possibleMoves.add(col+(row+1));
    }
    else if(pawn && !pawn.HAS_MOVED && (row < 9)){
        possibleMoves.add(col+(row+1));
        if(row+2 <= 8){
            possibleMoves.add(col+(row+2));
        }
    }
    return possibleMoves;
}