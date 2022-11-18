import  { useState } from 'react';

function ButtonPetr (props) {
    const [buton, changeImg] = useState(props.imageEnter);
    
    return (
        <input type="image" id="image" alt="button_test" className = "buttonPetr"
        src={buton}
        onMouseEnter={() => changeImg(props.imageLeave)}
        onMouseLeave={() => changeImg(props.imageEnter)}
        onClick={() => {
            console.log("petr!");
            changeImg("./game_sprites/petrblush.png")
        }}
        />
    )
}

export default ButtonPetr;