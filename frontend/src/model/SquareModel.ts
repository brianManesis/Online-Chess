import { PieceModel } from "./PieceModel";

export class SquareModel{
    private color:string;
    private pos:string;
    private piece?:PieceModel;

    public constructor(color:string,pos:string,piece?:PieceModel){
        this.color = color;
        this.pos = pos;
        this.piece = piece;
    }
    public getPiece():PieceModel | undefined{
        return this.piece;
    }
    public getColor():string{
        return this.color;
    }
    public getPos():string{
        return this.pos;
    }
}