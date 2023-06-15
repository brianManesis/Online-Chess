import { PlayerColor, PieceType } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";
import { SquareModel } from "../SquareModel";
import { ChessBoardModel } from "../ChessBoardModel";

export class KnightModel extends PieceModel{
    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
    }

    public validMove(boardModel:ChessBoardModel, startSquare:SquareModel,
        endSquare:SquareModel, playerColor:PlayerColor): boolean {
            const pos = endSquare.getPos();
            return this.updatePossibleMoves(boardModel,startSquare,playerColor).has(pos);    }

    private updatePossibleMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor):Set<string>{
        const knight = square.getPiece();
        const board = boardModel.getChessBoard();
        this.possibleMoves.clear();

        if(knight){
            const knightDirections = this.knightDirections();

            const chessNotation = square.getPos();
            const posArray = boardModel.posToArrayPos(chessNotation);

            if(posArray){
                let i = posArray.i;
                let j = posArray.j; 
                for(const [key,value] of Object.entries(knightDirections)){
                    this.checkSquare(board,i,j,value.dx,value.dy,playerColor);
                    this.checkSquare(board,i,j,value.dy,value.dx,playerColor);
                }
            }
        }
        console.log(this.possibleMoves)

        return this.possibleMoves;
    }

    private knightDirections(){
        return {
            leftUp:{
                dx:-2,
                dy:-1
            },
            rightUp:{
                dx:2,
                dy:-1
            },
            leftDown:{
                dx:-2,
                dy:1
            },
            rightDown:{
                dx:2,
                dy:1
            }
        }
    }
}