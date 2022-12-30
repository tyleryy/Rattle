import { useState, useContext } from 'react';
import { Context } from '../../providers/provider';
import { Socket } from 'socket.io-client';
import useSound from 'use-sound'
import "./buttons.css";

function ButtonChar(props) {

    const states = useContext(Context);
    const [lobby_code, changeLobbyCode] = states.lobby_state;
    const [player, changePlayer] = states.player_state;
    const [socket, _] = states.socket_state;


    const [buton, changeImg] = useState(props.imageEnter);
    const [playSound] = useSound("./game_audio/buttaudio.mp3", {volume: 1.0})
    const handleClick = (event) => {
        // event.currentTarget.disabled = true;
        console.log('button clicked');
    }
    const char = props.char;

    return (
        <input type="image" id="image" alt="button_test" className="buttonChar"
            src={buton}
            onMouseEnter={() => {
                changeImg(props.imageLeave)
                playSound()
            }}
            onMouseLeave={() => changeImg(props.imageEnter)}
            onClick={(event) => {
                handleClick(event);
                socket.emit("selectCharacter", { lobbyCode: lobby_code, player: player, char: char })
                console.log("selected character")
                props.setCheck(true);
                return;
            }}
        />
    )
}

export default ButtonChar;