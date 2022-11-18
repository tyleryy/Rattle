import  { useRef } from 'react';
import  { useState, useContext } from 'react';
import { Context } from '../../providers/provider';

function Button2 (props) {
    const inputRef = useRef(null);
    const states = useContext(Context);
    const [lobby_code, changeLobbyCode] = states.lobby_state;
    const [player, changePlayer] = states.player_state;
    const [socket, _] = states.socket_state;
    
    function handleClick() {
        let room = inputRef.current.value;
        changeLobbyCode(room)
        console.log(room);
        changePlayer('Player 2')
        socket.emit("joinLobby", room);
    }

    const [buton, changeImg] = useState(props.imageEnter);

    return (
        <div>
            <input ref={inputRef} type="text" id="msg" className="msg"/>
            <input type="image" id="image" alt="button_test" className = "msg_butt"
            src={buton}
            onMouseEnter={() => changeImg(props.imageLeave)}
            onMouseLeave={() => changeImg(props.imageEnter)}
            onClick={handleClick}
            />
        </div>
    )
}

export default Button2;