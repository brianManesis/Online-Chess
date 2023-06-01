import './Chessboard.css';
import Square from './Square';
import { ChessBoardModel } from '../../../../model/ChessBoardModel';

export default function Chessboard(props:{playerColor:string}){
    const playerColor = props.playerColor;
    
    const boardModel = new ChessBoardModel(playerColor).genChessBoard();
    const boardView:any = [[],[],[],[],[],[],[],[]];

    for(let i = 0; i<8; i++){
        for(let j = 0; j<8; j++){
            boardView[i].push(
                <Square squareModel={boardModel[i][j]}></Square>
            );
        }
    }
    return(
        <div id = "chessboard">
            {boardView}
        </div>
    );
}