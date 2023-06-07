import { PieceModel } from "./PieceModel";
import { SquareModel } from "./SquareModel";

export function pawnMove(fromSquare:SquareModel, toSquare:SquareModel){
    let fromSquarePos:string = fromSquare.getPos();
    let toSquarePos:string = toSquare.getPos();

    let pieceOnFromSquare: PieceModel | undefined = fromSquare.getPiece();
    let pieceOnToSquare: PieceModel | undefined = toSquare.getPiece();

    if(pieceOnFromSquare && pieceOnToSquare){
        fromSquare.setPiece(undefined);
        toSquare.setPiece(pieceOnFromSquare);
    }else if(pieceOnFromSquare && !pieceOnToSquare){
        toSquare.setPiece(pieceOnFromSquare);
    }
}
export function rookMove(){

}

export function knightMove(){

}

export function bishopMove(){

}

export function queenMove(){

}

export function kingMove(){

}