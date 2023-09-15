import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlayerColor } from "../utils/Constants";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state:any) => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleCreateGameClick = () => {
    setShowCreateModal(true);
  };

  const handleJoinGameClick = () => {
    setShowJoinModal(true);
  };

  const handleCreateGame = (color:string) => {
    const game = {
        host:true,
        hostColor:color,
        room:user.username
    }
    if(localStorage){
      localStorage.setItem('game', JSON.stringify(game))
    }
    setShowCreateModal(false);
    navigate('/game');
  }; 

  const handleJoinGame = () => {
    const game = {
      host:false,
      room:username
    }
    if(localStorage){
      localStorage.setItem('game', JSON.stringify(game))
    }
    setShowJoinModal(false);
    navigate('/game');
  };

  return (
    <div className="Dash">
      <h1>Welcome {user ? user.name : 'Guest'}</h1>
      <button className="btn" onClick={handleCreateGameClick}>
        Create Game
      </button>
      <button className="btn" onClick={handleJoinGameClick}>
        Join Game
      </button>

      {showCreateModal || showJoinModal ? (
        <div className="overlay">
          <div className="modal">
            <button className="close-button" onClick={() => {
                setShowCreateModal(false);
                setShowJoinModal(false);
                }}>
              X
            </button>
            {showCreateModal && (
              <div>
                <h1>Select Color</h1>
                <button className="btn" onClick={() => handleCreateGame(PlayerColor.BLACK)}>Black</button>
                <button className="btn" onClick={() => handleCreateGame(PlayerColor.WHITE)}>White</button>
              </div>
            )}
            {showJoinModal && (
              <div>
                <h1>Enter host username</h1>
                <input
                  type="text"
                  className="inp" 
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="btn" onClick={handleJoinGame}>Join</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
