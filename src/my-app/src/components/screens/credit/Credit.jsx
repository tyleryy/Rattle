import React from "react";
import BackButtonRow from "../../backButtonRow/backButtonRow";
import "./Credit.css";

function Credit() {
    return (
        <div className = "parentCredits">
            <BackButtonRow />
            <div className = "crds">
                <img src="./game_sprites/creditsfr.png" alt="creditsfr" />
            </div>
        </div>
    )
}

export default Credit;
