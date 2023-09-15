import { API_URL,PlayerColor } from "../utils/Constants";
import Chessboard from "../components/chess/game/board/Chessboard";
import './GamePlayPage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios";
import { socket } from "../lib/webSocket/socketConnection";
import UserHeader from "../components/common/UserHeader";

export default function GameplayPage(){

    const navigate = useNavigate();

    const {user} = useSelector((state:any) => state.auth);
    const [opponent, setOpponent] = useState("");
    const [playerColor, setPlayerColor] = useState(PlayerColor.WHITE);
    const [loaded, setLoaded] = useState(false);
    useEffect(() =>{
        if(!user){
            navigate('/login')
        }
    },[user,navigate]);

    useEffect(() => {
        const createGame = (game:{host:boolean, hostColor:string, room:string})=>{
            axios.post(API_URL+"/api/game/create",{host:game.room, hostColor:game.hostColor})
            .then(res => {
                socket.emit('createGame',{host:res.data.host, hostColor:res.data.hostColor});
                setPlayerColor(res.data.hostColor);
            })
            .catch(err => {
                navigate("/");
            });
        }
        const joinGame = (host:string)=>{
            axios.post(API_URL+"/api/game/join",{host})
            .then(res => {
                socket.emit('joinGame', res.data.host);
                setPlayerColor(res.data.color);
                socket.emit('playerJoined', user.username);
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
        const startGame = (opp:string)=>{
            if(!opponent)setOpponent(opp);
            setLoaded(true);
        }

        const gameString = localStorage.getItem('game');

        if(!gameString) navigate('/');
        else{
            const game = JSON.parse(gameString);

            if(game.host) createGame(game);
            else joinGame(game.room);
        }
        socket.on('endGame', leaveGame);
        socket.on("startGame", startGame);
        
        return ()=> {
            socket.off('endGame');
            socket.off('ready');
            socket.emit("leaveGame");
        }
    }, []);

    return (
        <div id="gamePlayPage">
            {loaded && 
            <>
                <UserHeader username={opponent} />
                <Chessboard socket={socket} playerColor={playerColor} opponent={opponent}></Chessboard>
                <UserHeader username={user.username} />
            </>
            }
        </div>
    );
}
