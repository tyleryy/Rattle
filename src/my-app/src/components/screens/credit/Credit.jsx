import React from "react";
import Screen from "../../screen_bg/Screen";
import Button from "../../buton/Button";
import BackButtonRow from "../../backButtonRow/backButtonRow";
import "./Credit.css";

function Credit(props) {
  return (
    <div className="parentCredits">
      <BackButtonRow />
      <div className="crds">
        <img src="./game_sprites/creditsfr.png" alt="creditsfr" />
      </div>
    </div>
  );
}

export default Credit;
