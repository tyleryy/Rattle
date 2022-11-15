import  { useState } from 'react';

function Button (props) {
    const [buton, changeImg] = useState(props.imageEnter);
    
    return (
        <input type="image" id="image" alt="button_test" className = "common_button"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        />
    )
}

export default Button;