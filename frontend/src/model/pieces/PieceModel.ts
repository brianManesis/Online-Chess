import { PieceType, PlayerColor, BOARD_SIZE } from "../../utils/Constants";
import { ChessBoardModel } from "../ChessBoardModel";
import { SquareModel } from "../SquareModel";

export abstract class PieceModel{
    protected type:PieceType;
    protected color:PlayerColor;
    protected possibleMoves:Set<string>
    public imageURI:string;
    public beenMoved:boolean;

    public constructor(type: PieceType, color: PlayerColor){
        this.type = type;
        this.color = color;
        this.imageURI = `/assets/images/${color+type}.png`;
        this.beenMoved = false;
        this.possibleMoves = new Set<string>();
    }
    public abstract validMove(boardModel:ChessBoardModel, startSquare:SquareModel, endSquare:SquareModel, playerColor:PlayerColor):boolean;

    public getType(): PieceType{
        return this.type;
    }
    public getColor(): PlayerColor{
        return this.color;
    }
    public withinBoard(i:number, j:number){
        return i>=0 &&
               i<BOARD_SIZE &&
               j>=0 &&
               j<BOARD_SIZE;
    }
    protected checkSquares(board:Array<Array<SquareModel>>,i:number,j:number,dx:number,
        dy:number, playerColor:PlayerColor){
        let flag = true;
        while(flag){
            flag = this.checkSquare(board,i,j,dx,dy,playerColor);
            i = i+dy;
            j = j+dx;
        }
    }
    protected checkSquare(board:Array<Array<SquareModel>>,i:number,j:number,dx:number,
        dy:number, playerColor:PlayerColor){
            let dI:number = i+dy;
            let dJ:number = j+dx;
            if(this.withinBoard(dI,dJ)){
                const tempSquare:SquareModel = board[dI][dJ];
                const tempPiece = tempSquare.getPiece()
                if(tempPiece && tempPiece.getColor() !== playerColor){
                    this.possibleMoves.add(tempSquare.getPos());
                    return true;
                }
                else if(!tempPiece){
                    this.possibleMoves.add(tempSquare.getPos());
                    return true;
                }
                else{ return false }
            }
            else{ return false; }
     }
}