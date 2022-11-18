import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { Coordinate } from "../../../../interfaces/interfaces";
import { circleIdleRadius, deltaX, lockedX, strokeSpawnX } from "../constants";
import { recreateStrokes } from "./common";

function PlayCanvas({ lastNonNull, backendStrokeHistory, p2Pos }: { lastNonNull: Coordinate, backendStrokeHistory: (number | null)[], p2Pos: Coordinate }) {
    const [timeTick, changeTimeTick] = useState(0);

    // strokeHistory is all the strokes that need to be recreated over time.
    const [animateHistory, changeAnimatedStrokes] = useState<Coordinate[]>([]);
    const [animateTickCount, setAnimateTickCount] = useState(0);

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

        // update the history with the new delta x
        let historyCopy = [...animateHistory];
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