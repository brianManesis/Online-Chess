import { PieceModel } from '../../../../model/pieces/PieceModel';

export function Piece(props:{piece:PieceModel}){
    let piece =props.piece;
    return (
                <div id={piece.getColor()+piece.getType()} 
                    className="piece" 
                    style={{backgroundImage: `url(${piece.imageURI})`}}>
                </div>
            );
}