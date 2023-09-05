import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { socketConnection } from "../lib/webSocket/socketConnection";
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
  const [selectedColor, setSelectedColor] = useState("");
  const [username, setUsername] = useState("");

  const handleCreateGameClick = () => {
    setShowCreateModal(true);
  };

  const handleJoinGameClick = () => {
    setShowJoinModal(true);
  };

  const handleCreateGame = (color:string) => {
    setSelectedColor(color);
    const game = {
        host:true,
        room:user.email
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
    <div>
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
                <h2>Select Color</h2>
                <button className="btn" onClick={() => handleCreateGame("black")}>Black</button>
                <button className="btn" onClick={() => handleCreateGame("white")}>White</button>
              </div>
            )}
            {showJoinModal && (
              <div>
                <h2>Join Game</h2>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleJoinGame}>Join</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
