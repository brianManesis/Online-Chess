import { PieceType } from "../Constants";

export class PieceModel{
    protected type:PieceType;
    protected color:string;
    public imageURI:string;

    public constructor(type: PieceType, color: string){
        this.type = type;
        this.color = color;
        this.imageURI = `/assets/images/${color+type}.png`;
    }
    public getType(): string{
        return this.type;
    }
    public getColor(): string{
        return this.color;
    }

    public move(): string{
        if(this.type == PieceType.PAWN){

        }else if(this.type == PieceType.ROOK){

        }else if(this.type == PieceType.KNIGHT){

        }else if(this.type == PieceType.BISHOP){

        }else if(this.type == PieceType.QUEEN){

        }else if(this.type == PieceType.KING){

        }
        return "";
    }

}