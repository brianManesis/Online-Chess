import './Chessboard.css';
import { SquareModel } from '../../../../model/SquareModel';
import { Piece } from '../pieces/Piece';

export default function Square(props: {squareModel: SquareModel}){
    const squareModel:SquareModel = props.squareModel;
    const piece = squareModel.getPiece();
    let pieceView;

    if(piece){
        pieceView = <Piece piece = {piece}/>
    }
    else{
        pieceView = undefined;
    }

    return (<div className={squareModel.getColor()+"Square"} id={squareModel.getPos()}>
                {pieceView}
            </div>);
}