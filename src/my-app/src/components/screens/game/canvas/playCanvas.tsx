import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Coordinate } from "../../../../interfaces/interfaces";
import { circleIdleRadius, deltaX, lockedX, strokeSpawnX } from "../constants";
import { recreateStrokes } from "./common";

function PlayCanvas({ lastNonNull, backendStrokeHistory, p2Pos, socket }: { lastNonNull: Coordinate, backendStrokeHistory: (number | null)[], p2Pos: Coordinate, socket: Socket }) {
    // function PlayCanvas({ backendStrokeHistory, socket }: { lastNonNull: Coordinate, backendStrokeHistory: (number | null)[], p2Pos: Coordinate, socket: Socket }) {

    const [timeTick, changeTimeTick] = useState(0);

    // strokeHistory is all the strokes that need to be recreated over time.
    const [animateHistory, changeAnimatedStrokes] = useState<Coordinate[]>([]);
    const [animateTickCount, setAnimateTickCount] = useState(0);

    const [doneAnimate, setDoneAnimate] = useState(false);

    const [lastNonNullXHistory, setLastNon] = useState(0);

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

        // find last non null x value to check later on if it's left the screen
        // iterate backwards and see if the last nonNull value's x is less than 0
        for (let i = baseAnimateStroke.length - 1; i >= 0; i--) {
            const currStrokeCheck = baseAnimateStroke.at(i);
            if (currStrokeCheck) {
                const y = currStrokeCheck.y;
                if (y !== null) {
                    setLastNon(i);
                    break;
                    // check if < canvas edge
                    // if (x < 0) {
                    // emit out
                    // console.log("EMITTING OUT END VERIFY");
                    // setDoneAnimate(true);
                    // socket.emit("endVerify");
                    // break;
                    // }
                }
            }
            // }
        }


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
                    // every x is null at the moment
                    if (stroke.y !== null) {
                        // we have a valid stroke we want to draw
                        if (stroke.x === null) {
                            // spawn the stroke in
                            stroke.x = strokeSpawnX;
                        } else {
                            // move this stroke back
                            stroke.x = stroke.x - deltaX;
                        }
                    }
                }
            }
            // check if the last value is off the screen yet
            const lastStrokePos = historyCopy.at(lastNonNullXHistory);
            if (lastStrokePos) {
                if (lastStrokePos) {
                    if (lastStrokePos.x) {
                        if (lastStrokePos.x < (lockedX - 500)) {
                            // stop animating
                            console.log("EMITTING OUT END VERIFY");
                            setDoneAnimate(true);
                            socket.emit("endVerify");
                        }
                    } else {
                        // console.error("lastStrokePos x is null");
                    }
                } else {
                    // console.error("lastStrokePos is null")
                }
            } else {
                // console.error("lastStrokePos is not defined");
            }
        }



        setAnimateTickCount(animateTickCount + 1);

        if (animateTickCount < historyCopy.length - 1) {
            // console.log(animateTickCount);
            // console.log("NOT ALL STROKES IN - on tick " + animateTickCount + " out of " + (historyCopy.length - 1));
        } else {
            // if (animateTickCount === historyCopy.length) {
            //     console.log("ALL STROKES ARE ON SCREEN");
            //     console.log(historyCopy);
            //     setDoneAnimate(true);
            // }
            // still continue to animate until the last non-zero x value is < 0
        }
        changeAnimatedStrokes(historyCopy);
        const newTime = timeTick + 1;
        changeTimeTick(newTime);
    });

    const [circleRad, changeCircleRad] = useState(circleIdleRadius);

    return (
        <Graphics draw={(g) => {
            // console.log("PLAY DRAW")
            // console.log(animateHistory)
            recreateStrokes(g, true, circleRad, animateHistory.slice(0, animateTickCount), lastNonNull, changeCircleRad, strokeSpawnX, lockedX, p2Pos);
            // recreateStrokes(g, true, circleRad, animateHistory.slice(0, animateTickCount), { x: 0, y: 0 }, changeCircleRad, strokeSpawnX, lockedX, { x: 0, y: 0 });
        }} />
    )
}

export default PlayCanvas;