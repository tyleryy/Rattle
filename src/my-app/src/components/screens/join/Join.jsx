import React from "react";
import {useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import Button2 from '../../buton/Button2';
import { useContext } from "react";
import { Context } from "../../../providers/provider";
import "./Join.css";
import BackButtonRow from "../../backButtonRow/backButtonRow";

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
        socket.emit("selectCharacter",{ lobbyCode: lobby_code, player: player, char: null })
      })
});
    

    return (
      <div>
        <BackButtonRow />
        <div className = "lobby_title">
          <img src="./game_sprites/enterlobbycode.png" id="ltitle"/>
        </div>
        <div className="inputForm">
               <Button2 class="input" imageEnter="./game_sprites/joinlob2.png" imageLeave="./game_sprites/joinlob.png" socket={socket} changeLobbyCode={changeLobbyCode}/>
        </div>
      </div>
    )
}

export default Join;