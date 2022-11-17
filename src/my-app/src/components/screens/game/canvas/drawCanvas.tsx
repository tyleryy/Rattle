import { Graphics, useTick } from "@inlet/react-pixi";
import { useState } from "react";
import { Coordinate } from "../../../../interfaces/interfaces";
import { drawSpeedMultiplier, circleIdleRadius, deltaX, lockedX } from "../constants";
import { recreateStrokes } from "./common";

function DrawCanvas({ lastNonNull, animateHistory, isDrawing }: { lastNonNull: Coordinate, changeAnimatedStrokes: (input: Coordinate[]) => void, animateHistory: Coordinate[], isDrawing: boolean }) {
    const [time, changeTime] = useState(0);

    useTick((delta) => {
        const newTime = time + delta;
        changeTime(newTime);

        // update the history with the new delta x
        let historyCopy = [...animateHistory];
        for (let stroke of historyCopy) {
            if (stroke.x !== null) {
                stroke.x = stroke.x - deltaX;
            }
        }
    })

    const [circleRad, changeCircleRad] = useState(circleIdleRadius);



    return (
        <Graphics draw={(g) => {
            recreateStrokes(g, isDrawing, circleRad, animateHistory, lastNonNull, changeCircleRad, lockedX, lockedX);
        }} />
    )
}

export default DrawCanvas;