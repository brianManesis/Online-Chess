import { PlayerColor, PieceType } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";
import { SquareModel } from "../SquareModel";
import { ChessBoardModel } from "../ChessBoardModel";

export class KingModel extends PieceModel{
    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
    }

    public validMove(boardModel:ChessBoardModel, startSquare:SquareModel,
        endSquare:SquareModel, playerColor:PlayerColor): boolean {
            const pos = endSquare.getPos();
            return this.updatePossibleMoves(boardModel,startSquare,playerColor).has(pos); 
        }
    
    private updatePossibleMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor):Set<string>{
        const king = square.getPiece();
        const board = boardModel.getChessBoard();
        this.possibleMoves.clear();

        if(!king) return this.possibleMoves;

        const kingDirections = this.kingDirections();
        const chessNotation = square.getPos();
        const posArray = boardModel.posToArrayPos(chessNotation);

        if(!posArray) return this.possibleMoves;

        let i = posArray.i;
        let j = posArray.j; 
        
        for(const [key,value] of Object.entries(kingDirections)){
            this.checkSquare(board,i,j,value.dx,value.dy,playerColor);
        }
        console.log(this.possibleMoves)

        return this.possibleMoves;
    }

    private kingDirections(){
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
            },
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
}