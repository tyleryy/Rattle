import  { useState } from 'react';
import "./buttons.css";

function ButtonPetr (props) {
    const [buton, changeImg] = useState(props.imageEnter);
    
    return (
        <input type="image" id="image" alt="button_test" className = "buttonPetr"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={() => {
            console.log("petr!");
        }}
        />
    )
}

export default ButtonPetr;