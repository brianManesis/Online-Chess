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
            return this.getPossibleMoves(boardModel,startSquare,playerColor).has(pos);  
    }

    public getPossibleMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor):Set<string>{
        const knight = square.getPiece();
        const board = boardModel.getChessBoard();
        this.possibleMoves.clear();

        if(!knight) return this.possibleMoves;

        const knightDirections = KnightModel.knightDirections;
        const chessNotation = square.getPos();
        const posArray = boardModel.posToArrayPos(chessNotation);

        if(!posArray) return this.possibleMoves;

        let i = posArray.i;
        let j = posArray.j; 
        for(const [,value] of Object.entries(knightDirections)){
            this.checkSquare(board,i,j,value.dx,value.dy,playerColor);
        }
        //console.log(this.possibleMoves)

        return this.possibleMoves;
    }

    public static knightDirections = {
        one:{
            dx:-2,
            dy:-1
        },
        two:{
            dx:2,
            dy:-1
        },
        three:{
            dx:-2,
            dy:1
        },
        four:{
            dx:2,
            dy:1
        },
        five:{
            dx:-1,
            dy:-2
        },
        six:{
            dx:-1,
            dy:2
        },
        seven:{
            dx:1,
            dy:-2
        },
        eight:{
            dx:1,
            dy:2
        }
    }
}