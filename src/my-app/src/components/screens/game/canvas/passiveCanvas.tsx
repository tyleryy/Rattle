import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import React from 'react'
import { Socket } from "socket.io-client";
import { Coordinate } from "../../../../interfaces/interfaces";
import { circleIdleRadius, lockedX, strokeSpawnX } from "../constants";
import { recreateStrokes } from "./common";

function PassiveCanvas({ lastNonNull, p2Pos, socket }: { lastNonNull: Coordinate, p2Pos: Coordinate, socket: Socket }) {
    const [timeTick, changeTimeTick] = useState(0);

    // strokeHistory is all the strokes that need to be recreated over time.
    const [animateHistory, changeAnimatedStrokes] = useState<Coordinate[]>([]);

    useEffect(() => {
        socket.on("updateAnimatedStrokes", (animatedStrokes) => {
            changeAnimatedStrokes(animatedStrokes);
        })
    }, []);

    useTick(() => {
        // wait until the first part has reached the end

        // // update the history with the new delta x
        // let historyCopy = [...animateHistory];
        // for (let i = 0; i < animateTickCount; i++) {
        //     let stroke = historyCopy.at(i);
        //     if (stroke) {
        //         if (!stroke.x && stroke.y !== null) {
        //             stroke.x = strokeSpawnX;
        //         } else if (stroke.x !== null) {
        //             stroke.x = stroke.x - deltaX;
        //         }
        //     }

        // }
        // if (animateTickCount < historyCopy.length - 1) {
        //     setAnimateTickCount(animateTickCount + 1);
        // }

        socket.emit('update_game_frame', {
            playerPos: lastNonNull
        });

        const newTime = timeTick + 1;
        changeTimeTick(newTime);
    })

    const [circleRad, changeCircleRad] = useState(circleIdleRadius);

    return (
        <Graphics draw={(g) => {
            recreateStrokes(g, true, circleRad, animateHistory, lastNonNull, changeCircleRad, strokeSpawnX, lockedX, p2Pos);
        }} />
    )
}

export default PassiveCanvas;