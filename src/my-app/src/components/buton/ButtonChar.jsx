import  { useState } from 'react';

function ButtonChar (props) {

    const [buton, changeImg] = useState(props.imageEnter);
    
    return (
        <input type="image" id="image" alt="button_test" className = "buttonChar"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={() => console.log("hello")}
        />
    )
}

export default ButtonChar;