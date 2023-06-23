import { PlayerColor, PieceType, BOARD_SIZE } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";
import { SquareModel } from "../SquareModel";
import { ChessBoardModel } from "../ChessBoardModel";
import { QueenModel } from "./QueenModel";
import { RookModel } from "./RookModel";
import { BishopModel } from "./BishopModel";
import { KnightModel } from "./KnightModel";

export class KingModel extends PieceModel{

    public isChecked:boolean;

    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
        this.isChecked = false;
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

        const kingDirections = KingModel.kingDirections;
        const chessNotation = square.getPos();
        const posArray = boardModel.posToArrayPos(chessNotation);

        if(!posArray) return this.possibleMoves;

        let i = posArray.i
        let j = posArray.j; 
        
        for(const [key,value] of Object.entries(kingDirections)){
            this.checkSquare(board,i,j,value.dx,value.dy,playerColor);
        }
        
        this.possibleMoves.forEach(element=>{
            if(this.kingInCheck(boardModel,element)){
                this.possibleMoves.delete(element);
            }
        });
        console.log(this.possibleMoves)

        return this.possibleMoves;
    }
    public kingInCheck(boardModel:ChessBoardModel, kingPos:string){
        let lookForQueen = boardModel.searchBoardFromPos
        (this,kingPos,QueenModel.queenDirections,PieceType.QUEEN,boardModel.findPieceInDirection);

        let lookForRook = boardModel.searchBoardFromPos
        (this,kingPos,RookModel.rookDirections,PieceType.ROOK,boardModel.findPieceInDirection);

        let lookForBishop = boardModel.searchBoardFromPos
        (this,kingPos,BishopModel.bishopDirections,PieceType.BISHOP,boardModel.findPieceInDirection);

        let lookForKnight = boardModel.searchBoardFromPos
        (this,kingPos,KnightModel.knightDirections,PieceType.KNIGHT,boardModel.findPiece);

        let lookForKing = boardModel.searchBoardFromPos
        (this,kingPos,KingModel.kingDirections,PieceType.KING,boardModel.findPiece);

         let lookForPawn = boardModel.findPawnAttack
         (this,kingPos,PieceType.PAWN);

        return lookForQueen || lookForRook || lookForBishop || lookForKnight || lookForKing || lookForPawn;
    }
    private static kingDirections = {
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