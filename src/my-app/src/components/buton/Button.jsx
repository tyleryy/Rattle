import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound'
import "./buttons.css";

function Button (props) {
    const navigate = useNavigate();
    const [buton, changeImg] = useState(props.imageEnter);
    const emit_event = props.socketEmitEvent ?? null; 
    const socket = props.socket;
    const [playSound] = useSound("./game_audio/buttaudio.mp3", {volume: 1.0})
    

    return (
        <input type="image" id="image" alt="button_test" className = "common_button"
        src={buton}
        onMouseEnter={() => {
            changeImg(props.imageLeave)
            playSound()
        }}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={() => {
            console.log(emit_event);
            if (emit_event) {
                socket.emit(emit_event);
            } else {
                navigate(props.routesPath);
            }
        }}
        />
    )
}

export default Button;