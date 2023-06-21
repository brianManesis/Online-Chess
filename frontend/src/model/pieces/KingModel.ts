import { PlayerColor, PieceType, BOARD_SIZE } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";
import { SquareModel } from "../SquareModel";
import { ChessBoardModel } from "../ChessBoardModel";
import { QueenModel } from "./QueenModel";
import { RookModel } from "./RookModel";

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

        let i = posArray.i;
        let j = posArray.j; 
        
        for(const [key,value] of Object.entries(kingDirections)){
            this.checkSquare(board,i,j,value.dx,value.dy,playerColor);
        }
        console.log(this.possibleMoves)

        this.possibleMoves.forEach(element=>{
            if(this.kingWillBeInCheck(boardModel,element)){
                this.possibleMoves.delete(element);
            }
        });
        console.log(this.possibleMoves)

        return this.possibleMoves;
    }
    private kingWillBeInCheck(boardModel:ChessBoardModel, kingPos:string){
        const board = boardModel.getChessBoard();
        const posArray = boardModel.posToArrayPos(kingPos);
        
        if(!posArray) return false;

        //check row and column for queen
        console.log(kingPos);
        let rookDirections = RookModel.rookDirections;
        for(const [key,value] of Object.entries(rookDirections)){
            let i = posArray.i;
            let j = posArray.j;
            let flag = true;
            while(flag){
                i += value.dy;
                j += value.dx;
                if(this.withinBoard(i,j)){
                    const currentPiece = board[i][j].getPiece();
                    if(currentPiece && currentPiece.getColor() !== this.color){
                        if( currentPiece.getType() == PieceType.QUEEN ||
                            currentPiece.getType() == PieceType.ROOK
                        ){
                                return true;
                        }
                        else{
                            flag = false;
                        }
                    }else if( currentPiece && 
                              currentPiece.getColor() === this.color &&
                              currentPiece !== this){
                        flag = false;
                    }
                }
                else flag = false;
            }       
        }

        return false;
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