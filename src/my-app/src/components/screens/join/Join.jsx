import React from "react";
import {useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import Button2 from '../../buton/Button2';
import { useContext } from "react";
import { Context } from "../../../providers/provider";

function Join() {
    /*
    const navigate = useNavigate();
    // state variable that tracks the value of the input field
    const inputRef = useRef(null);
    
    function handleClick() {
        console.log(inputRef.current.value);
    }*/
    const states = useContext(Context);
    const [lobby_code, changeLobbyCode] = states.lobby_state;
    const [player, changePlayer] = states.player_state;
    const [socket, _] = states.socket_state;
    const navigate = useNavigate();
    
    useEffect(() => {
  
      socket.on('P2JoinedLobby', (game_obj) => {
        console.log("p2 joined")
        console.log("P2JOINED")
        changeLobbyCode(game_obj.code)
        navigate('/choose')
        // ! might be bad
        socket.emit("selectCharacter", game_obj.code, "Player 1", game_obj.p1char)
      })
});
    

    return (
        <div className="App">
        <header className="App-header">
          <Screen image="./game_sprites/brick3.png"></Screen>
          <div className = "join">
                <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
                <Button2 imageEnter="./game_sprites/joinlob2.png" imageLeave="./game_sprites/joinlob.png" ></Button2>
          </div>
        </header>
      </div>
    )
}

export default Join;