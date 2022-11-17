import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./buttons.css";

function SmallButton (props) {
    const navigate = useNavigate();
    const [buton, changeImg] = useState(props.imageEnter);
    const emit_event = props.socketEmitEvent ?? null; 
    const socket = props.socket;
    
    return (
        <input type="image" id="image" alt="button_test" className = "small_button"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={async () => {
            console.log(emit_event)
            if (emit_event) {
                await socket.emit(emit_event)
            }
            navigate(props.routesPath)
        }}
        />
    )
}

export default SmallButton;