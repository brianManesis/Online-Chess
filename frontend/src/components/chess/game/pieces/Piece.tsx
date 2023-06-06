import { PieceModel } from '../../../../model/PieceModel';

export function Piece(props:{piece:PieceModel}){
    let piece =props.piece;
    return (
                <div className="piece" style={{backgroundImage: `url(${piece.imageURI})`}}>
                </div>
            );
}