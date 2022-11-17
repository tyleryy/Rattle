import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import ButtonChar from '../../buton/ButtonChar';



function Choose(props) {
    const navigate = useNavigate();
    const [socket, changeSocket] = useState(props.socket);
    const [code, changeCode] = useState(props.lobbyCode);


    useEffect(() => {

          socket.on('Go Home', () => {
            navigate('/');
          })
        
        
        return () => {socket.removeAllListeners()};
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <div>{props.code}</div>
                <Screen image="./game_sprites/brick3.png"></Screen>
                <div className = "choose">
                    <div>
                        <ButtonChar imageEnter="./game_sprites/char1_but.png" imageLeave="./game_sprites/char1_but2.png"></ButtonChar>
                    </div>
                    <div>
                        <ButtonChar imageEnter="./game_sprites/char2_but.png" imageLeave="./game_sprites/char2_but2.png"></ButtonChar>
                    </div>
                    <div>
                    <ButtonChar imageEnter="./game_sprites/char3_but2.png" imageLeave="./game_sprites/char3_but.png"></ButtonChar>
                    </div>
                </div>
            </header>
        </div>

    )
}

export default Choose;