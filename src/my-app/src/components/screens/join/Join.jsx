import React from "react";
import {useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import Button2 from '../../buton/Button2';
import "./Join.css";
import BackButtonRow from "../../backButtonRow/backButtonRow";

function Join(props) {
    /*
    const navigate = useNavigate();
    // state variable that tracks the value of the input field
    const inputRef = useRef(null);
    
    function handleClick() {
        console.log(inputRef.current.value);
    }*/
    const socket = props.socket;
    const changeLobbyCode = props.changeLobbyCode;
    const navigate = useNavigate();
    
    useEffect(() => {
  
      socket.on('P2JoinedLobby', (game_obj) => {
        console.log("p2 joined")
        let p1 = game_obj.p1;
        let p2 = game_obj.p2;
        console.log("P2JOINED")
        props.changeLobbyCode(game_obj.code)
        navigate('/choose')
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