import Button from '../buton/Button';
import "./backButtonRow.css";

function BackButtonRow(props) {
    return (
            <div className = "row">
                <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
            </div>
    )
}

export default BackButtonRow;