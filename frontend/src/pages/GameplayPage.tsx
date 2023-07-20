import { PlayerColor } from "../utils/Constants";
import Chessboard from "../components/chess/game/board/Chessboard";
import './GamePlayPage.css';
import { useEffect, useState } from "react";

export default function GameplayPage(){

    const [playerColor, setPlayerColor] = useState(PlayerColor.WHITE);
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        fetch("http://localhost:5000/game/create")
        .then(res => res.json())
        .then(data => {
            setPlayerColor(data.color);
            setLoaded(true);
        });
    },[]);

    return (
        <div id="gamePlayPage">
            {loaded && <Chessboard playerColor={playerColor}></Chessboard>}
        </div>
    );
}
