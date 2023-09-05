import { API_URL,PlayerColor } from "../utils/Constants";
import Chessboard from "../components/chess/game/board/Chessboard";
import './GamePlayPage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios";
import { socketConnection } from "../lib/webSocket/socketConnection";

export default function GameplayPage(){

    const navigate = useNavigate();

    const {user} = useSelector((state:any) => state.auth);
    const [socket, setSocket] = useState(socketConnection);
    const [playerColor, setPlayerColor] = useState(PlayerColor.WHITE);
    const [loaded, setLoaded] = useState(false);
    useEffect(() =>{
        if(!user){
            navigate('/login')
        }
    },[user,navigate]);

    useEffect(() => {
        const gameString = localStorage.getItem('game');
        if(!gameString) navigate('/');
        else{
            const game = JSON.parse(gameString);
            if(game.host) createGame(game.room);
            else joinGame(game.room);
        }
        socket.on('endGame', leaveGame);
        socket.on("ready", ()=> setLoaded(true));

        return ()=> {
            socketConnection.emit("leaveGame");
        }
    }, []);

    const createGame = (room:string)=>{
        axios.post(API_URL+"/api/game/create",{room})
        .then(res => {
            socket.emit('joinGame',room);
            setPlayerColor(PlayerColor.WHITE);
        })
        .catch(err => {
            navigate("/");
        });
    }
    const joinGame = (room:string)=>{
        axios.post(API_URL+"/api/game/join",{room})
        .then(res => {
            socket.emit('joinGame',room);
            socket.emit('startGame');
            setPlayerColor(PlayerColor.BLACK);
        })
        .catch(err => {
            navigate("/");
            alert("Lobby does not exist")
        });
    }

    const leaveGame = ()=>{
        socket.emit("leaveGame");
        navigate("/");
    }
    return (
        <div id="gamePlayPage">
            {loaded && <Chessboard socket={socket} playerColor={playerColor}></Chessboard>}
        </div>
    );
}
