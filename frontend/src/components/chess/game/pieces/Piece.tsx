import { PieceModel } from '../../../../model/PieceModel';

export function Piece(props:{piece:PieceModel}){
    let piece =props.piece;
    return (
                <img src = {piece.imageURI}
                     draggable="false">
                </img>
            );
}