import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./buttons.css";
import { Socket } from "socket.io-client"

function SmallButton({ imageEnter, imageLeave, routesPath, socket, socketEmitEvent }: { imageEnter: string, imageLeave: string, routesPath: string, socket: Socket, socketEmitEvent: string | null | undefined, }) {
    const navigate = useNavigate();
    const [buton, changeImg] = useState(imageEnter);

    return (
        <input type="image" id="image" alt="button_test" className="small_button"
            src={buton}
            onMouseEnter={() => changeImg(imageLeave)}
            onMouseLeave={() => changeImg(imageEnter)}
            onClick={() => {
                if (socketEmitEvent !== null && socketEmitEvent !== undefined) {
                    socket.emit(socketEmitEvent);
                } else {
                    navigate(routesPath);
                }
            }}
        />
    )
}

export default SmallButton;