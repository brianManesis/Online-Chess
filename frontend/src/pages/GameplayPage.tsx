import { PlayerColor } from "../Constants";
import Chessboard from "../components/chess/game/board/Chessboard";
import './GamePlayPage.css';

export default function GameplayPage(){
    return (
        <div id="gamePlayPage">
            <Chessboard playerColor={PlayerColor.BLACK}></Chessboard>
        </div>
    );
}