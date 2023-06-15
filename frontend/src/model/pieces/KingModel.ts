import { PlayerColor, PieceType } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";

export class KingModel extends PieceModel{
    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
    }

    public validMove(): boolean {
        return true;
    }
}