import { PlayerColor } from "../Constants";
import { PieceModel } from "./PieceModel";

export const pawnDirections = (pawn:PieceModel)=>{
    return pawn.getColor() === PlayerColor.WHITE?
    {
        dx: 0,
        dy: -1,
        takes: {
            left:{
                dx: -1,
                dy: -1
            },
            right:{
                dx: 1,
                dy: -1
            }
        }
    }:
    {
        dx: 0,
        dy: 1,
        takes: {
            left:{
                dx: -1,
                dy: 1
            },
            right:{
                dx: 1,
                dy: 1
            }
        }
    }
}