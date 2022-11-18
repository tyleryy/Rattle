import  { useState } from 'react';
import "./buttons.css";

function ButtonVal (props) {

    let count = 0;

    const [buton, changeImg] = useState(props.imageEnter);
    const handleClick = event => {
        count = props.Val
        console.log('button clicked');
    }
    
    return (
        <input type="image" id="image" alt="button_test" className = "buttonVal"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={(event) => {
            handleClick(event);
            return;
        }}
        />
    )
}

export default ButtonVal;