import { PlayerColor, PieceType } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";
import { SquareModel } from "../SquareModel";
import { ChessBoardModel } from "../ChessBoardModel";

export class RookModel extends PieceModel{
    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
    }

    public validMove(boardModel:ChessBoardModel, startSquare:SquareModel,
        endSquare:SquareModel, playerColor:PlayerColor): boolean {
            const pos = endSquare.getPos();
            return this.updatePossibleMoves(boardModel,startSquare,playerColor).has(pos);    }

    private updatePossibleMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor):Set<string>{
        const rook = square.getPiece();
        const board = boardModel.getChessBoard();
        this.possibleMoves.clear();

        if(rook){
            const rookDirections = this.rookDirections();
            const chessNotation = square.getPos();
            const posArray = boardModel.posToArrayPos(chessNotation);

            if(posArray){
                let i = posArray.i;
                let j = posArray.j; 
                for(const [key,value] of Object.entries(rookDirections)){
                    this.checkSquares(board,i,j,value.dx,value.dy,playerColor);
                }
            }
        }
        console.log(this.possibleMoves)

        return this.possibleMoves;
    }

    private rookDirections(){
        return {
            left:{
                dx:-1,
                dy:0
            },
            right:{
                dx:1,
                dy:0
            },
            up:{
                dx:0,
                dy:-1
            },
            down:{
                dx:0,
                dy:1
            }
        }
    }
}