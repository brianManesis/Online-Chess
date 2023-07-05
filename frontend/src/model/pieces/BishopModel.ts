import { PlayerColor, PieceType } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";
import { SquareModel } from "../SquareModel";
import { ChessBoardModel } from "../ChessBoardModel";

export class BishopModel extends PieceModel{
    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
    }

    public validMove(boardModel:ChessBoardModel, startSquare:SquareModel,
        endSquare:SquareModel, playerColor:PlayerColor): boolean {
            const pos = endSquare.getPos();
            return this.getPossibleMoves(boardModel,startSquare,playerColor).has(pos);   
    }

    public getPossibleMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor):Set<string>{
        const rook = square.getPiece();
        const board = boardModel.getChessBoard();
        this.possibleMoves.clear();

        if(!rook) return this.possibleMoves;

        const bishopDirections = BishopModel.bishopDirections;
        const chessNotation = square.getPos();
        const posArray = boardModel.posToArrayPos(chessNotation);

        if(!posArray) return this.possibleMoves;

        let i = posArray.i;
        let j = posArray.j; 
        for(const [,value] of Object.entries(bishopDirections)){
            this.checkSquares(board,i,j,value.dx,value.dy,playerColor);
        }
        //console.log(this.possibleMoves)

        return this.possibleMoves;
    }

    public static bishopDirections = {
            leftUp:{
                dx:-1,
                dy:-1
            },
            rightUp:{
                dx:1,
                dy:-1
            },
            leftDown:{
                dx:-1,
                dy:1
            },
            rightDown:{
                dx:1,
                dy:1
            }
    }
}