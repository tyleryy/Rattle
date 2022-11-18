import  { useState, useContext } from 'react';
import { Context } from '../../providers/provider';
import { Socket } from 'socket.io-client';

function ButtonChar (props) {

    const states = useContext(Context);
    const [lobby_code, changeLobbyCode] = states.lobby_state;
    const [player, changePlayer] = states.player_state;
    const [socket, _] = states.socket_state;
    const player_char = props.player_char;


    const [buton, changeImg] = useState(props.imageEnter);
    const handleClick = (event) => {
        // event.currentTarget.disabled = true;
        console.log('button clicked');
    }
    
    return (
        <input type="image" id="image" alt="button_test" className = "buttonChar"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={(event) => {
            handleClick(event);
            props.changeChar(props.butChar)
            socket.emit("selectCharacter", lobby_code, player, player_char)
            console.log("selected character")
            props.setCheck(true);
            return;
        }}
        />
    )
}

export default ButtonChar;