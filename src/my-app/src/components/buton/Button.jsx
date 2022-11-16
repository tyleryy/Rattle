import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Button (props) {
    const navigate = useNavigate();
    const [buton, changeImg] = useState(props.imageEnter);
    
    return (
        <input type="image" id="image" alt="button_test" className = "common_button"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={() => navigate(props.routesPath)}
        />
    )
}

export default Button;