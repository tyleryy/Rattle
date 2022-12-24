import { useState, useContext } from 'react';
import { Context } from '../../providers/provider';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import useSound from 'use-sound'
import "./buttons.css";

function Button({ imageEnter, imageLeave, routesPath, socketEmitEvent }: { imageEnter: string, imageLeave: string, routesPath: string, socketEmitEvent: string | null | undefined, }) {
    const navigate = useNavigate();
    const states = useContext<any>(Context);
    const [socket, ]: [Socket, any] = states.socket_state;
    const [buton, changeImg] = useState(imageEnter);
    const [playSound] = useSound("./game_audio/buttaudio.mp3", {volume: 1.0})
    return (
        <input type="image" id="image" alt="button_test" className="common_button"
            src={buton}
            onMouseEnter={() => {
                changeImg(imageLeave)
                playSound()
            }}
            onMouseLeave={() => changeImg(imageEnter)}
            onClick={() => {
                if (socketEmitEvent !== null && socketEmitEvent !== undefined && socketEmitEvent.length !== 0) {
                    socket.emit(socketEmitEvent);
                } else {
                    navigate(routesPath);
                }
            }}
        />
    )
}

export default Button;