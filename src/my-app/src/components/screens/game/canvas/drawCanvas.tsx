import { Graphics, useTick } from "@inlet/react-pixi";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { Coordinate } from "../../../../interfaces/interfaces";
import { circleIdleRadius, deltaX, lockedX } from "../constants";
import { recreateStrokes } from "./common";

function DrawCanvas({ lastNonNull, animateHistory, isDrawing, socket, p2Pos }: { lastNonNull: Coordinate, changeAnimatedStrokes: (input: Coordinate[]) => void, animateHistory: Coordinate[], isDrawing: boolean, socket: Socket, p2Pos: Coordinate }) {
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
        socket.emit('update_game_frame', {
            playerPos: lastNonNull
        })
    })

    const [circleRad, changeCircleRad] = useState(circleIdleRadius);



    return (
        <Graphics draw={(g) => {
            recreateStrokes(g, isDrawing, circleRad, animateHistory, lastNonNull, changeCircleRad, lockedX, lockedX, p2Pos);
        }} />
    )
}

export default DrawCanvas;