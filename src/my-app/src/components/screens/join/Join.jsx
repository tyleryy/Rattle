import React from "react";
import {useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import Button2 from '../../buton/Button2';

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
        <div className="App">
        <header className="App-header">
          <Screen image="./game_sprites/brick3.png"></Screen>
          <div className = "join">
                <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
                <Button2 imageEnter="./game_sprites/joinlob2.png" imageLeave="./game_sprites/joinlob.png" socket={socket} changeLobbyCode={changeLobbyCode}></Button2>
          </div>
        </header>
      </div>
    )
}

export default Join;