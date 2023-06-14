import { PieceType, PlayerColor } from "../Constants";

export class PieceModel{
    protected type:PieceType;
    protected color:PlayerColor;
    public imageURI:string;
    public beenMoved:boolean;

    public constructor(type: PieceType, color: PlayerColor){
        this.type = type;
        this.color = color;
        this.imageURI = `/assets/images/${color+type}.png`;
        this.beenMoved = false;
    }
    public getType(): PieceType{
        return this.type;
    }
    public getColor(): PlayerColor{
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