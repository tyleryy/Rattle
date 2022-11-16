import React from "react";
import { useNavigate } from "react-router-dom";

function Credit(props) {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Credits</h1>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    )
}

export default Credit;