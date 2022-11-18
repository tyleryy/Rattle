import  { useState, useEffect, useContext } from 'react';
import { Context } from '../../providers/provider';
import { useNavigate } from 'react-router-dom';

function Button (props) {
    const states = useContext(Context);
    const [socket, _] = states.socket_state;
    const navigate = useNavigate();
    const [buton, changeImg] = useState(props.imageEnter);
    const emit_event = props.socketEmitEvent ?? null; 
    

    return (
        <input type="image" id="image" alt="button_test" className = "common_button"
        src={buton}

         

        onMouseEnter={() => changeImg(props.imageLeave)}
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