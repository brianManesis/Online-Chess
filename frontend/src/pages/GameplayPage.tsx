import { API_URL,PlayerColor } from "../utils/Constants";
import Chessboard from "../components/chess/game/board/Chessboard";
import './GamePlayPage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function GameplayPage(){

    const navigate = useNavigate();

    const {user} = useSelector((state:any) => state.auth);

    useEffect(() =>{
        if(!user){
            navigate('/login')
        }
    },[user,navigate])

    const [playerColor, setPlayerColor] = useState(PlayerColor.WHITE);
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        fetch(API_URL+"/api/game/create")
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
