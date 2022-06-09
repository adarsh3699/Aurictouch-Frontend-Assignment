import React from 'react';
import footballIcon from "../img/football.png"

import "../css/bar.css"

function Bar() {
    return (
        <div id='bar'>
            <img src={footballIcon} id="football" />
            <div>Fantasy Football</div>
        </div>
    );
}

export default Bar;