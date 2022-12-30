import  { useRef } from 'react';
import  { useState, useContext } from 'react';
import { Context } from '../../providers/provider';
import useSound from 'use-sound'

import "./buttons.css";

function Button2 (props) {
    const inputRef = useRef(null);
    const states = useContext(Context);
    const [, changeLobbyCode] = states.lobby_state;
    const [, changePlayer] = states.player_state;
    const [socket, ] = states.socket_state;
    const [playSound] = useSound("./game_audio/buttaudio.mp3", {volume: 1.0})
    function handleClick() {
        let room = inputRef.current.value;
        changeLobbyCode(room)
        console.log(room);
        changePlayer('Player 2')
        socket.emit("joinLobby", room);
    }

    const [buton, changeImg] = useState(props.imageEnter);

    return (
        <div className="inputForm">
            <input ref={inputRef} type="text" id="msg" className="msg"/>
            <input type="image" id="image" alt="button_test" className = "msg_butt"
            src={buton}
            onMouseEnter={() => {
                changeImg(props.imageLeave)
                playSound()
            }}
            onMouseLeave={() => changeImg(props.imageEnter)}
            onClick={handleClick}
            />
        </div>
    )
}

export default Button2;