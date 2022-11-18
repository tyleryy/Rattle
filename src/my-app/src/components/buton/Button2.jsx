import  { useRef } from 'react';
import  { useState } from 'react';

function Button2 (props) {
    const inputRef = useRef(null);
    const socket = props.socket;
    
    function handleClick() {
        let room = inputRef.current.value;
        console.log(room);
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