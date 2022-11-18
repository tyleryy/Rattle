import { useState, useEffect, useContext } from 'react';
import { Context } from '../../providers/provider';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import "./buttons.css";

function Button({ imageEnter, imageLeave, routesPath, socketEmitEvent }: { imageEnter: string, imageLeave: string, routesPath: string, socketEmitEvent: string | null | undefined, }) {
    const navigate = useNavigate();
    const states = useContext<any>(Context);
    const [socket, _]: [Socket, any] = states.socket_state;
    const [buton, changeImg] = useState(imageEnter);
    return (
        <input type="image" id="image" alt="button_test" className="common_button"
            src={buton}
            onMouseEnter={() => changeImg(imageLeave)}
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