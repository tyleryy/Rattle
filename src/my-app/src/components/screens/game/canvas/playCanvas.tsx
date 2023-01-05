import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import React from 'react'
import { Socket } from "socket.io-client";
import { Coordinate } from "../../../../interfaces/interfaces";
import { circleIdleRadius, deltaX, lockedX, strokeSpawnX } from "../constants";
import { recreateStrokes } from "./common";

function PlayCanvas({ lastNonNull, backendStrokeHistory, p2Pos, socket }: { lastNonNull: Coordinate, backendStrokeHistory: (number | null)[], p2Pos: Coordinate, socket: Socket }) {
    const [timeTick, changeTimeTick] = useState(0);

    // strokeHistory is all the strokes that need to be recreated over time.
    const [animateHistory, changeAnimatedStrokes] = useState<Coordinate[]>([]);
    const [animateTickCount, setAnimateTickCount] = useState(0);

    const [doneAnimate, setDoneAnimate] = useState(false);

    const ticksToPlay = (strokeSpawnX - lockedX) / deltaX;

    useEffect(() => {
        // take in the strokeHistory and convert them all into coordinates with x as null
        console.log("PLAY CANVAS RENDERED FOLLOW ME");
        console.log(backendStrokeHistory)
        const baseAnimateStroke: Coordinate[] = backendStrokeHistory.map((stroke) => {
            // console.log(stroke)
            return {
                x: null,
                y: stroke
            }
        });
        // console.log(baseAnimateStroke)

        changeAnimatedStrokes(baseAnimateStroke);
    }, []);

    useTick((delta) => {
        // wait until the first part has reached the end
        let historyCopy = [...animateHistory];

        if (!doneAnimate) {
            // update the history with the new delta x
            for (let i = 0; i < animateTickCount; i++) {
                let stroke = historyCopy.at(i);
                if (stroke) {
                    if (!stroke.x && stroke.y !== null) {
                        stroke.x = strokeSpawnX;
                    } else if (stroke.x !== null) {
                        stroke.x = stroke.x - deltaX;
                    }
                }
            }

            // iterate backwards and see if the last nonNull value's x is less than 0
            for (let i = historyCopy.length - 1; i >= 0; i--) {
                const currStrokeCheck = historyCopy.at(i);
                if (currStrokeCheck) {
                    const x = currStrokeCheck.x;
                    const y = currStrokeCheck.y;
                    if (x !== null && y !== null) {
                        // check if < canvas edge
                        if (x < 0) {
                            // emit out
                            console.log("EMITTING OUT END VERIFY");
                            setDoneAnimate(true);
                            socket.emit("endVerify");
                            break;
                        }
                    }
                }
            }
        }


        if (animateTickCount < historyCopy.length - 1) {
            setAnimateTickCount(animateTickCount + 1);
        }

        const newTime = timeTick + 1;
        changeTimeTick(newTime);
    })

    const [circleRad, changeCircleRad] = useState(circleIdleRadius);

    return (
        <Graphics draw={(g) => {
            // console.log("PLAY DRAW")
            // console.log(animateHistory)
            recreateStrokes(g, true, circleRad, animateHistory, lastNonNull, changeCircleRad, strokeSpawnX, lockedX, p2Pos);
        }} />
    )
}

export default PlayCanvas;