import { PlayerColor } from "../utils/Constants";
import { ChessBoardModel } from "./ChessBoardModel";
import { SquareModel } from "./SquareModel";
import { pawnDirections } from "./pieceDirections";

export function possiblePawnMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor){
    const pawn = square.getPiece();
    const possibleMoves = new Set<string>();

    if(pawn){
        const board = boardModel.getChessBoard();
        const pieceDirections = pawnDirections(pawn);
        const chessNotation = square.getPos();
        const posArray = boardModel.posToArrayPos(chessNotation);

        if(posArray){
            let forwardSquare = board[posArray.i+pieceDirections.dy][posArray.j+pieceDirections.dx];
            let forwardSquarePiece = forwardSquare.getPiece();
            if(forwardSquarePiece && forwardSquarePiece.getColor() !== playerColor){
                possibleMoves.add(forwardSquare.getPos());
            }
            
            let leftTakes = pieceDirections.takes.left;
            let leftSquare = board[posArray.i+leftTakes.dy][posArray.j+leftTakes.dx];
            let leftSquarePiece = leftSquare.getPiece();
            if(leftSquarePiece && leftSquarePiece.getColor() !== playerColor){
                possibleMoves.add(leftSquare.getPos());
            }

            let rightTakes = pieceDirections.takes.right;
            let rightSquare = board[posArray.i+rightTakes.dy][posArray.j+rightTakes.dx];
            let rightSquarePiece = rightSquare.getPiece();
            if(rightSquarePiece && rightSquarePiece.getColor() !== playerColor){
                possibleMoves.add(rightSquare.getPos());
            }
        }
    }
    return possibleMoves;


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