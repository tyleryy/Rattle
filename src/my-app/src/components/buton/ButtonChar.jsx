import  { useState } from 'react';
import useSound from 'use-sound'
import "./buttons.css";


function ButtonChar (props) {

    const [buton, changeImg] = useState(props.imageEnter);
    const [playSound] = useSound("./game_audio/buttaudio.mp3", {volume: 1.0})
    const handleClick = event => {
        // event.currentTarget.disabled = true;
        console.log('button clicked');
    }
    
    return (
        <input type="image" id="image" alt="button_test" className = "buttonChar"
        src={buton}
        onMouseEnter={() => {
            changeImg(props.imageLeave)
            playSound()
        }}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={(event) => {
            handleClick(event);
            props.setCheck(true);
            return;
        }}
        />
    )
}

export default ButtonChar;