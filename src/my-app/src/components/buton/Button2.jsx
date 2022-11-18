import  { useRef } from 'react';
import  { useState } from 'react';
import useSound from 'use-sound'
import "./buttons.css";

function Button2 (props) {
    const inputRef = useRef(null);
    const socket = props.socket;
    const [playSound] = useSound("./game_audio/buttaudio.mp3", {volume: 1.0})

    function handleClick() {
        let room = inputRef.current.value;
        console.log(room);
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